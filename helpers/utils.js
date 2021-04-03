const Criteria = require('../models/Criteria');
const { dataLearning } = require('../controllers/dummyData');
const _ = require('lodash');

module.exports = {
  sumNumber: (arr) => {
    let sum = 0;
    for (const val of arr) {
      sum += Number(val.initialWeight);
    }
    return Number(sum.toFixed(2));
  },

  calculateNewWeight: (current, alfa, weightError, destination) => {
    // console.log(current, alfa, weightError, destination);
    return current + alfa * weightError * destination;
  },

  getCriterias: async () => {
    // console.log('masuk');
    const response = await Criteria.find({ deleteAt: null });
    return response;
  },

  //   updateData: async (bulk) => {
  //     const update = await Criteria.findByIdAndUpdate(
  //       { _id: key._id },
  //       { initialWeight: Number(numInitial) }
  //     );
  //   },

  algoritma: async () => {
    const response = await Criteria.find({ deleteAt: null });
    const initial = [];
    dataLearning.forEach(async (items) => {
      let data = response.slice(0, 20);
      const wnxn = [];
      items.forEach((item, index) => {
        if (item.alias === 'target') {
          destination = item.initialWeight;
        } else {
          wnxn.push({
            initialWeight:
              _.get(item, 'initialWeight', 0) *
              _.get(data[index], 'initialWeight', 0),
          });
        }
      });
      initial.push({
        // yIn,
        // yOut,
        // weightError,
        wnxn,
        // wNew,
      });
    });

    return initial;
  },
};

// initial.push({
//   yIn,

// });
// initial.push({
//   yOut,
// });
// initial.push({
//   weightError,
// });

// const update = await Criteria.findByIdAndUpdate(
//   { _id: key._id },
//   { initialWeight: Number(numInitial) }
// );

// try {
//   const dummy = await getCriterias();
//   const eMax = dummy.find((item) => item.name === 'E-max').initialWeight;
//   var totalError = 3;
//   var totalWeightError = 0;

//   console.log(`1111111111`, totalError);
//   const temp = [];
//   // while (totalError > eMax) {
//   const response = await Criteria.find({ deleteAt: null });

//   console.log('data');
//   dataLearning.forEach(async (items, index) => {
//     // let data = index === 0 ? response.slice(0, 20) : wNew;
//     let data = response.slice(0, 20);
//     console.log('runnign');
//     var destination = 0;
//     const alfa = response.find((item) => item.name === 'alfa').initialWeight;
//     const initial = [];
//     const wnxn = [];
//     items.forEach((item, index) => {
//       if (item.alias === 'target') {
//         destination = item.initialWeight;
//       } else {
//         wnxn.push({
//           initialWeight:
//             _.get(item, 'initialWeight', 0) *
//             _.get(data[index], 'initialWeight', 0),
//         });
//       }
//     });
//     const yIn = sumNumber(wnxn);
//     const yOut = 1 / (1 + Math.exp(-yIn));
//     const weightError = destination - yOut;
//     const wNew = [];
//     for (const key of data) {
//       const numInitial = calculateNewWeight(
//         key.initialWeight,
//         alfa,
//         weightError,
//         destination
//       );
//       const update = await Criteria.findByIdAndUpdate(
//         { _id: key._id },
//         { initialWeight: Number(numInitial.toFixed(2)) }
//       );

//       wNew.push({
//         _id: key._id,
//         initialWeight: Number(numInitial.toFixed(2)),
//       });
//     }
//     initial.push({
//       yIn,
//       yOut: Number(yOut.toFixed(2)),
//       weightError: Number(weightError.toFixed(2)),
//       wnxn,
//       wNew,
//     });
//     // data = wNew;
//     // data.push(wNew);
//     // console.log(data);
//     temp.push(initial[0]);
//     if (index === dataLearning.length - 1) {
//       // console.log(`.......`, temp);
//       const wight = temp[0].weightError.toFixed(2);
//       // console.log(wight);
//       totalWeightError = Number(wight);
//       // totalWeightError.push(Number(wight));
//       let quadrat = 0;
//       for (const key of temp) {
//         quadrat += Math.pow(key.weightError, 2);
//       }
//       const result = quadrat * 0.5;
//       totalError = Number(result.toFixed(2));
//       // totalError.push(Number(result.toFixed(2)));
//       console.log('emax', eMax);
//       console.log('totalError', totalError, totalError < eMax);
//       console.log('totalWeightError', totalWeightError, totalWeightError === 0);
//     }
//   });
//   // }
//   if (totalError < eMax) {
//     console.log('masuk-if');
//     res.status(200).json({
//       size: temp.length,
//       data: temp,
//       // response,
//     });
//   }
// } catch (error) {
//   console.log(error);
//   res.status(500).json(error);
// }
