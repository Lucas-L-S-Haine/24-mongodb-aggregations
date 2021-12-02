db.trips.aggregate(
  [
    {
      $match: {
        birthYear: { $exists: true, $ne: "" },
      },
    },
    {
      $project: {
        _id: 0,
        year: { $toInt: "$birthYear" },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: { $max: "$year" },
        menorAnoNascimento: { $min: "$year" },
      },
    },
    {
      $project: {
        _id: 0,
        maiorAnoNascimento: "$maiorAnoNascimento",
        menorAnoNascimento: "$menorAnoNascimento",
      },
    },
  ],
);
