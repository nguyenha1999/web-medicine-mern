const Imports = require("../../model/import");
const Exports = require("../../model/export");
const moment = require("moment");
const MomentRange = require("moment-range");
const _ = require("lodash");
const Chemistry = require("../../model/chemistry");
MomentRange.extendMoment(moment);

module.exports = {
  index: async function () {
    function generateDataFor2MonthAgo() {
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
    }

    async function groupDataFor2MonthAgo(
      model,

      groupField
    ) {
      return await model.aggregate([
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
            totalPrice: {
              $sum: "$totalPrice",
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: "$count",
            totalPrice: "$totalPrice",
          },
        },
      ]);
    }

    const importTotal = await Imports.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },

          totalImported: {
            $sum: "$totalPrice",
          },
          countI: {
            $sum: 1,
          },
        },
      },
    ]);

    const exportTotal = await Exports.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },

          totalExported: {
            $sum: "$totalPrice",
          },
          countE: {
            $sum: 1,
          },
        },
      },
    ]);

    const y = (totalIm =
      exportTotal[0].totalExported - importTotal[0].totalImported);

    const data2MonthAgo = generateDataFor2MonthAgo();

    const importStatistics = await groupDataFor2MonthAgo(Imports, "createdAt");
    const exportStatistics = await groupDataFor2MonthAgo(Exports, "createdAt");

    const importTrack = _.sortBy(
      _.unionBy([...importStatistics, ...data2MonthAgo], "date"),
      "date"
    );
    const exportTrack = _.sortBy(
      _.unionBy([...exportStatistics, ...data2MonthAgo], "date"),
      "date"
    );

    const listChemExport = await Chemistry.aggregate([
      {
        $group: {
          _id: "$code",
          //   code: "$code",
          //   name: "$name",
          totalExportChemistryOfMounth: { $sum: "$countExportOfMounth" },
        },
      },
      {
        $project: {
          _id: "$_id",
          //   code: "$code",
          //   name: "$name",
          totalExportChemistryOfMounth: "$totalExportChemistryOfMounth",
        },
      },
    ]);

    const total = await Chemistry.aggregate([
      {
        $group: {
          _id: { $month: "$createAt" },
          total: { $sum: "$countExportOfMounth" },
        },
      },
      {
        $project: {
          _id: "$_id",
          total: "$total",
        },
      },
    ]);

    return {
      exportTotal,
      importTotal,
      y,
      importTrack,
      exportTrack,
      listChemExport,
      total,
    };
  },
};
