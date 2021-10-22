const codes = {
    unfy: {
        1001: {
            description:
                "A connection couldn't be made to the backend's websocket.",
            whatToDo: "Make sure Unifey is currently online. If it is, make sure your internet connection is stable to maintain a connection to the Unifey servers."
        },
        2035: {
            description:
                "GitHub Issue https://github.com/unifey-net/frontend/issues/35",
            whatToDo: "Currently, nothing can be done about this. Please seek further updates in the Unifey Discord server for this issue."
        },
    },
};

export const getHelpPage = (str: string): JSX.Element => {
    if (!str.includes(":"))
        return <h1>Malformed help code!</h1>;

    const split = str.split(":")

    const app = split[0]
    const code = split[1]

    const result = codes[app.toLowerCase()][+code]

    return (
        <>
            {result ? (
                <>
                    <h1>
                        {app} | {code}
                    </h1>
                    <p
                        dangerouslySetInnerHTML={{ __html: result.description }}
                    />

                    <p
                        dangerouslySetInnerHTML={{ __html: result.whatToDo }}
                    />
                </>
            ) : (
                <p>That app or code could not be found!</p>
            )}
        </>
    );
}