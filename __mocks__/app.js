//fake Api
const fetchSingleTrip = () => {
    console.log("::: Form Submitted :::")
    return Promise.resolve(
        { 
            city: 'Vienna',
            country: 'AT',
            date: '03/28/2021'
        });
};

exports.fetchSingleTrip = fetchSingleTrip;