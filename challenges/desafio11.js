db.trips.aggregate(
  [
    {
      $project: {
        _id: 0,
        startTime: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: "$startTime",
        total: { $count: { } },
      },
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
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
