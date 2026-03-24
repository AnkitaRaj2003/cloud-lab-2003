module.exports = async function (context, req) {

    const arr = req.body?.numbers || [1,2,3,4,5];

    const sum = arr.reduce((a,b) => a+b,0);
    const max = Math.max(...arr);

    context.res = {
        status: 200,
        body: {
            operation: "array operations",
            input: arr,
            sum: sum,
            max: max
        }
    };
};
