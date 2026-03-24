module.exports = async function (context, req) {

    const n = Number(req.query.n || 5);

    let result = [];

    for(let i=1;i<=n;i++){
        result.push(i);
    }

    context.res = {
        status: 200,
        body: {
            operation: "loop",
            upto: n,
            result: result
        }
    };
};
