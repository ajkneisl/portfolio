import Layout from "../app/components/Layout";
import { useRouter } from "next/router";
import { getHelpPage } from "../app/util/HelpUtil";

const Help = () => {
    const router = useRouter()
    const help = router.query.code

    return (
        <Layout>
            {help ? getHelpPage(`${help}`) : <h1>That help page could not be found.</h1>}
        </Layout>
    );
};

export default Help;