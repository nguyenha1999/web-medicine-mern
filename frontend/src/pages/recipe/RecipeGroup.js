import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinkVertical } from "@visx/shape";
import { notification } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { create, getById, update } from "../../api/recipe";
import EditNodeModal from "./EditNodeModal";
import useForceUpdate from "./useForceUpdate";

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

const RecipeGroup = ({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}) => {
  const history = useHistory();

  const param = useParams();
  const { id, productId } = param;
  console.log(param);
  const [editingNode, setEditingNode] = useState(null);
  const [data, setData] = useState({
    name: "Root name",
    children: [],
  });

  const forceUpdate = useForceUpdate();

  const getData = useCallback(async () => {
    if (!id) return;
    const res = await getById(id);
    setData(res.data);
  }, [id]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line no-use-before-define
  }, [getData, id]);
  const getChild = (parent, childId) => {
    return parent.children.find((item) => item._id === childId);
  };

  const getParentFromRoot = () => {
    const parentIds = pathIds.slice(0, pathIds.length - 1);

    let child = data;
    for (const parentId of parentIds) {
      child = getChild(child, parentId);
    }

    return child;
  };

  const getChildFromRoot = () => {
    let child = data;
    for (const id of pathIds) {
      child = getChild(child, id);
    }

    return child;
  };

  const getNodeParentIds = useCallback((node) => {
    if (!node) return [];
    try {
      let ids = [node.data._id];
      if (node.parent) {
        ids = [...ids, ...getNodeParentIds(node.parent)];
      }

      return ids;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const pathIds = useMemo(() => {
    const ids = getNodeParentIds(editingNode);
    if (ids.length === 1) return ids;
    return ids.reverse().slice(1);
  }, [editingNode, getNodeParentIds]);

  const onRemove = async () => {
    try {
      const itemId = pathIds[pathIds.length - 1];
      const currentParent = getParentFromRoot();
      currentParent.children = currentParent.children.filter(
        (item) => item._id !== itemId
      );
      if (!currentParent.children.length) {
        currentParent.children = null;
      }

      await update(data);

      setEditingNode(null);
      forceUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const removeNewChildrenId = (data) => {
    if (data.children && data.children.length) {
      data.children = data.children.map((item) => {
        if (!item.isNew) return removeNewChildrenId(item);
        const formattedData = {
          name: item.name,
          code: item.code,
          ratio: item.ratio,
        };
        if (item.children && item.children.length) {
          formattedData.children = item.children.map((child) =>
            removeNewChildrenId(child)
          );
        }

        return formattedData;
      });
    }
    return data;
  };

  //submit data

  const onOk = async (values) => {
    try {
      const child = getChildFromRoot(pathIds);
      for (const key of Object.keys(values)) {
        child[key] = values[key];
      }

      removeNewChildrenId(data);

      await update(data);
      await getData();

      forceUpdate();
      setEditingNode(null);
    } catch (err) {
      console.error(err);
      notification.error({ message: err.message });
    }
  };

  //ok ở root

  const onOkRoot = async (values) => {
    try {
      if (data?._id) {
        values._id = data._id;
      }
      removeNewChildrenId(values);

      if (!data._id) {
        const res = await create(values);
        const { _id } = res.data;
        history.push(`/recipe/${productId}/${_id}`);
      } else {
        await update(values);
        await getData();
      }

      forceUpdate();
      setEditingNode(null);
    } catch (err) {
      console.error(err);
      notification.error({ message: err.message });
    }
  };

  const onCancel = () => {
    setEditingNode(null);
  };

  //mở tất cả nút con

  const openAllChildren = (node) => {
    node.data.isExpanded = false;
    if (!node.children || !node.children.length) return;
    for (const child of node.children) {
      openAllChildren(child);
    }
  };

  //đóng tất cả nút con

  const closeAllChildren = (node) => {
    if (!node.children || !node.children.length) return;
    if (node.data) {
      node.data.isExpanded = true;
    } else {
      node.isExpanded = true;
    }
    for (const child of node.children) {
      closeAllChildren(child);
    }
  };

  //mở nút con

  const openChildren = (node) => {
    if (!node.data.children || !node.data.children.length) return;
    node.data.isExpanded = false;
    for (const child of node.data.children) {
      closeAllChildren(child);
    }
  };

  const onToggleNode = (node) => {
    if (!node.data.children || !node.data.children.length) return;

    // đóng mở nút con
    if (node.data.isExpanded) {
      openChildren(node);
    } else {
      // mở nút cháu
      if (node.children.some((child) => child.data.isExpanded)) {
        openAllChildren(node);
      } else {
        closeAllChildren(node);
      }
    }
  };

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;
  const origin = { x: 0, y: 0 };

  if (!data) return null;

  return totalWidth < 10 ? null : (
    <div>
      <EditNodeModal
        node={editingNode}
        onOk={onOk}
        onOkRoot={onOkRoot}
        onCancel={onCancel}
        onRemove={onRemove}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[innerWidth, innerHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkVertical
                    key={i}
                    data={link}
                    stroke="rgb(254,110,158,0.6)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
                {tree.descendants().map((node, key) => {
                  const widthChil = 40;
                  const heightChil = 20;
                  const centerX = -widthChil / 2;
                  const centerY = -heightChil / 2;
                  const X = widthChil / 2 - 20;
                  const Y = heightChil / 2 + 4;

                  return (
                    <Group top={node.y} left={node.x} key={key}>
                      {node.depth === 0 && (
                        <>
                          <circle
                            r={16}
                            fill="url('#links-gradient')"
                            onClick={() => {
                              onToggleNode(node);
                              forceUpdate();
                            }}
                          />
                          <Group top={Y} left={X}>
                            <>
                              <Group>
                                <circle
                                  r={9}
                                  fill="#272b4d"
                                  stroke={"#26deb0"}
                                  strokeDasharray={"0.5"}
                                  strokeOpacity={0.6}
                                  onClick={() => setEditingNode(node)}
                                />
                              </Group>
                              <text
                                dy=".33em"
                                fontSize={9}
                                fontFamily="Arial"
                                textAnchor="middle"
                                style={{ pointerEvents: "none" }}
                                fill="#ddf163"
                                onClick={() => setEditingNode(node)}
                              >
                                +
                              </text>
                            </>
                          </Group>
                        </>
                      )}
                      {node.depth !== 0 && (
                        <>
                          <rect
                            height={heightChil}
                            width={widthChil}
                            y={centerY}
                            x={centerX}
                            fill="#272b4d"
                            stroke={node.data.children ? "#03c0dc" : "#26deb0"}
                            strokeWidth={1}
                            strokeDasharray={node.data.children ? "0" : "2,2"}
                            strokeOpacity={node.data.children ? 1 : 0.6}
                            rx={node.data.children ? 0 : 10}
                            onClick={() => {
                              onToggleNode(node);
                              forceUpdate();
                            }}
                          />
                          <Group top={Y} left={X}>
                            <circle
                              r={9}
                              fill="#272b4d"
                              stroke={"#26deb0"}
                              strokeDasharray={"0.5"}
                              strokeOpacity={0.6}
                              onClick={() => setEditingNode(node)}
                            />
                            <text
                              dy=".33em"
                              fontSize={9}
                              fontFamily="Arial"
                              textAnchor="middle"
                              style={{ pointerEvents: "none" }}
                              fill="#ddf163"
                              onClick={() => setEditingNode(node)}
                            >
                              ...
                            </text>
                          </Group>
                        </>
                      )}
                      <text
                        dy=".33em"
                        fontSize={9}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: "none" }}
                        fill={
                          node.depth === 0
                            ? "#71248e"
                            : node.children
                            ? "white"
                            : "#26deb0"
                        }
                      >
                        {node.data.code ? node.data.code : node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
};

export default RecipeGroup;
