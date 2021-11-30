db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { countries: { $all: ["USA"] } },
          { "tomatoes.viewer.rating": { $gte: 3 } },
          { cast: { $exists: true } },
        ],
      },
    },
    { $addFields:
      { favs:
        { $setIntersection:
          [
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
      },
    },
    {
      $addFields:
      {
        num_favs: { $size: "$favs" },
      },
    },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    {
      $project: {
        _id: 0,
        title: "$title",
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
  ],
);
