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
        _id: "$bikeid",
        duracaoMediaEmMinutos: { $avg: "$duracao" },
      },
    },
    {
      $project: {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
      },
    },
    {
      $sort: {
        duracaoMedia: -1,
      },
    },
    {
      $limit: 5,
    },
  ],
);
