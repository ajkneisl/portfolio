import Image from "next/image";

type LogoProps = {
    name: string
}

const Logo = ({ name }: LogoProps) => {
    return <Image alt={"LOGO!"} src={`/logos/${name}.png`} width={24} height={24}/>;
};

export default Logo;
