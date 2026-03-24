module.exports = async function (context, req) {

    const text = req.query.text || "hello azure";

    context.res = {
        status: 200,
        body: {
            original: text,
            uppercase: text.toUpperCase(),
            length: text.length,
            reversed: text.split("").reverse().join("")
        }
    };
};
