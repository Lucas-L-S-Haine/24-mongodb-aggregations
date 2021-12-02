db.air_alliances.aggregate(
  [
    {
      $lookup: {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        as: "routes",
      },
    },
    {
      $unwind: "$airlines",
    },
    {
      $unwind: "$routes",
    },
    {
      $match: {
        "routes.airplane": { $in: ["747", "380"] },
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$airlines", "$routes.airline.name"],
        },
      },
    },
    {
      $group: {
        _id: "$airlines",
        totalRotas: { $count: { } },
      },
    },
    {
      $sort: {
        totalRotas: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
