const Recipe = require("../../model/chemistry");

module.exports = {
  index: async function (code) {
    const myFilterObj = { code: code };
    const populateObj = {
      path: "children.chemId",
      populate: {
        path: "children.chemId",
        populate: {
          path: "children.chemId",
          populate: {
            path: "children.chemId",
            populate: {
              path: "children.chemId",
              populate: {
                path: "children.chemId",
                populate: {
                  path: "children.chemId",
                  populate: "children.chemId",
                },
              },
            },
          },
        },
      },
    };

    const test = await Recipe.findOne(myFilterObj).populate(populateObj);
    if (!test?.children) {
      const arr = await Recipe.findOne({ code });
      return arr;
    }
    return test;
  },
  post_index: async function (data, child) {
    const parent = await Recipe.findOne({ code: data.code });
    const chil = await Recipe.findOne({ code: child.code });
    if (chil) {
      let arr = { chemId: chil?._id, ratio: child?.ratio };
      if (parent?.children) {
        parent?.children.push(arr);
      } else {
        parent.children = [];
        parent?.children.push(arr);
      }
    } else {
      return await {
        error: true,
        status: 400,
        message: "Không tìm thấy hoá chất trong danh mục!",
      };
    }
    return await Recipe.findByIdAndUpdate(parent._id, {
      children: parent?.children,
    });
  },
  put_index: async function (code, data, children) {
    const parent = await Recipe.findOne({ code: code });
    return await Recipe.findByIdAndUpdate(parent._id, {
      name: data.name,
    });
  },
  delete_index: async function (childId, parentId) {
    const parent = await Recipe.find({ _id: parentId });
    console.log(parent.children);
    const arr = parent?.children?.filter((e) => e.chemId !== childId);
    return await Recipe.findByIdAndUpdate(parentId, {
      children: parent.children,
    });
  },
};
