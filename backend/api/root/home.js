const Moment = require("moment");
const MomentRange = require("moment-range");
const Imports = require("../../model/import");
const Exports = require("../../model/export");
const moment = MomentRange.extendMoment(Moment);

module.exports = {
  index: function () {
    const generateDataFor2MonthAgo = function () {
      const start = moment().subtract(2, "month"),
        end = moment(),
        range = moment.range(moment(start), moment(end));

      const data2MonthAgo = [];

      for (const date of range.by("day")) {
        data2MonthAgo.push({
          date: date.format("YYYY-MM-DD"),
          count: 0,
        });
      }

      return data2MonthAgo;
    };

    const groupDataFor2MonthAgo = function (model, groupField) {
      return model.aggregate([
        {
          $match: {
            [groupField]: {
              $gte: moment().subtract(2, "month").toDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: `$${groupField}` },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: "$count",
          },
        },
      ]);
    };

    const totalPriceSchema = function (model, groupField) {
      return Imports.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: `$${groupField}` },
            },
            count: { $sum: 1 },
          },
        },
      ]);
    };

    const data2MonthAgo = generateDataFor2MonthAgo();

    const countImport = groupDataFor2MonthAgo(Imports, "totalPrice");
    const countExport = groupDataFor2MonthAgo(Exports, "totalPrice");
    console.log(countImport);

    return;
  },
};
