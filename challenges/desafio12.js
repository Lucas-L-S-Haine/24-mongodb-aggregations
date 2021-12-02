db.trips.aggregate(
  [
    {
      $project: {
        _id: 0,
        startTime: {
          $dayOfWeek: "$startTime",
        },
        station: "$startStationName",
      },
    },
    {
      $group: {
        _id: {
          station: "$station",
          startTime: "$startTime",
        },
        total: { $count: { } },
      },
    },
    {
      $project: {
        _id: 0,
        nomeEstacao: "$_id.station",
        total: "$total",
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
