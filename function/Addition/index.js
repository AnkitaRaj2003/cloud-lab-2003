module.exports = async function (context, req) {
    const a = Number(req.query.a || (req.body && req.body.a));
    const b = Number(req.query.b || (req.body && req.body.b));

    if (isNaN(a) || isNaN(b)) {
        context.res = {
            status: 400,
            body: "Please provide numbers a and b"
        };
        return;
    }

    context.res = {
        status: 200,
        body: {
            operation: "addition",
            a: a,
            b: b,
            result: a + b
        }
    };
};
