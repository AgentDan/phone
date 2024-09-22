import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Environment, Html, ScrollControls, useProgress} from "@react-three/drei";
import styled from "styled-components";
import Experience from "../components/Experience";

const Section = styled.section`
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 5;
    background-color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Atmos = () => {
    return (
        <Section>
            <Canvas>
                <ScrollControls pages={5} damping={0.3}>
                    <Suspense fallback={null}>
                        <Environment preset="sunset"/>
                        <Experience/>
                    </Suspense>
                </ScrollControls>
            </Canvas>
        </Section>
    );
};

export default Atmos;