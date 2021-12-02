db.trips.aggregate(
  [
    {
      $project: {
        _id: 0,
        usertype: "$usertype",
        time: {
          $divide: [
            {
              $dateDiff: {
                startDate: "$startTime",
                endDate: "$stopTime",
                unit: "millisecond",
              },
            }, 3.6e6,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$usertype",
        time: { $avg: "$time" },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: ["$time", 2] },
      },
    },
    {
      $sort: {
        duracaoMedia: 1,
      },
    },
  ],
);
