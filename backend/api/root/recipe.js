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
                  populate: {
                    path: "children.chemId",
                    populate: "children.chemId",
                  },
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
    } else if (data.code === child.code) {
      return await {
        error: true,
        status: 400,
        message: "Một hoá chất không được phép là con của chính nó!",
      };
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
  put_index: async function (_id, name, data, code, ratio) {
    if (_id) {
      return await Recipe.findByIdAndUpdate(_id, {
        name: name,
      });
    }
    if (data) {
      const i = data.children.findIndex((e) => e.code === code);
      if (i !== -1) {
        const idSubChem = data.children[i]._id;
        const parentChemIsDb = await Recipe.findOne({ _id: data._id });
        const index = parentChemIsDb.children.findIndex(
          (e) => e.chemId == idSubChem
        );
        parentChemIsDb.children[index].ratio = ratio;
        newChild = [...parentChemIsDb.children];
        const a = await Recipe.findByIdAndUpdate(data._id, {
          children: newChild,
        });
      }
    }

    const chem = await Recipe.findOne({ code });
    return await Recipe.findByIdAndUpdate(chem._id, { name: name });
  },
  delete_index: async function (childId, parentId) {
    const parent = await Recipe.find({ _id: parentId });
    const arr = parent?.children?.filter((e) => e.chemId !== childId);
    return await Recipe.findByIdAndUpdate(parentId, {
      children: parent.children,
    });
  },
};
