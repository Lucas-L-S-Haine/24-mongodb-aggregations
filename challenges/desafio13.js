db.trips.aggregate(
  [
    {
      $match: {
        startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
      },
    },
    {
      $addFields: {
        duracao: {
          $dateDiff: {
            startDate: "$startTime",
            endDate: "$stopTime",
            unit: "minute",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMediaEmMinutos: { $avg: "$duracao" },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      },
    },
  ],
);
