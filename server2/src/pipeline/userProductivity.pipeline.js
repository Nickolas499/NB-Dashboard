export const userProductivity = [

  {
    $lookup: {
      from: "designs",
      localField: "USER",
      foreignField: "USER",
      as: "designs",
    },
  },
  {
    $lookup: {
      from: "redesigns",
      localField: "USER",
      foreignField: "USER",
      as: "redesigns",
    },
  },
  {
    $unwind: {
      path: "$designs",
    },
  },
  {
    $unwind: {
      path: "$redesigns",
    },
  },
  {
    $group: {
      _id: {
        USER: "$USER",
        DATE: "$DATE",
      },
      LS3: {
        $sum: "$LS3",
      },
      ZEISS: {
        $sum: "$ZEISS",
      },
      SHAPE: {
        $sum: "$SHAPE",
      },
      COPY_MILL: {
        $sum: "$COPY_MILL",
      },
      FULL_ARCH: {
        $sum: "$FULL_ARCH",
      },
      IBO: {
        $sum: "$designs.IBO_DESINED",
      },
      CROWN_R: {
        $sum: "$designs.CROWN_REST",
      },
      CBR: {
        $sum: "$designs.CEMENTE_BRIDGE_REST",
      },
      FAP: {
        $sum: "$designs.FULL_ARCH_P",
      },
      FAF: {
        $sum: "$designs.FULL_ARCH_F",
      },
      IMP_R: {
        $sum: "$designs.IMPLANT_REST",
      },
      IMP_B_R: {
        $sum: "$designs.IMPLANT_BRIDGE_REST",
      },
      PRINT_M: {
        $sum: "$designs.PRINTED_MODELS",
      },
      IBO_R: {
        $sum: "$redesigns.IBO_DESINED",
      },
      CROWN_R_R: {
        $sum: "$redesigns.CROWN_REST",
      },
      CBR_R: {
        $sum: "$redesigns.CEMENTE_BRIDGE_REST",
      },
      FAP_R: {
        $sum: "$redesigns.FULL_ARCH_P",
      },
      FAF_R: {
        $sum: "$redesigns.FULL_ARCH_F",
      },
      IMP_R_R: {
        $sum: "$redesigns.IMPLANT_REST",
      },
      IMP_B_R_R: {
        $sum: "$redesigns.IMPLANT_BRIDGE_REST",
      },
    },
  },
  {
    $project: {
      _id: 1,
      LS3: 1,
      ZEISS: 1,
      SHAPE: 1,
      COPY_MILL: 1,
      FULL_ARCH: 1,
      IBO: 1,
      CROWN_R: 1,
      CBR: 1,
      FAP: 1,
      FAF: 1,
      IMP_R: 1,
      IMP_B_R: 1,
      PRINT_M: 1,
      IBO_R: 1,
      CROWN_R_R: 1,
      CBR_R: 1,
      FAP_R: 1,
      FAF_R: 1,
      IMP_R_R: 1,
      IMP_B_R_R: 1,
    },
  },
  {
    $sort: {
      _id: -1,
    },
  },
];
