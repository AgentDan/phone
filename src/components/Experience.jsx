import React, {useRef, useMemo} from 'react';
import {Box, Float, PerspectiveCamera, useGLTF, useScroll} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three"
import {Vector3} from "three";

const LINE_NB_POINTS = 24000;

const Experience = () => {
    const {nodes, materials} = useGLTF("./models/stena.glb");

    const cameraGroup = useRef()
    const boxRef = useRef()
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -10),
                new THREE.Vector3(-2, 0, -20),
                new THREE.Vector3(-3, 0, -30),
                new THREE.Vector3(0, 15, -40),
                new THREE.Vector3(5, 0, -50),
                new THREE.Vector3(7, -5, -60),
                new THREE.Vector3(5, 0, -70),
                new THREE.Vector3(0, 0, -80),
                new THREE.Vector3(0, 0, -90),
                new THREE.Vector3(0, 0, -100),
            ],
            false,
            "catmullrom",
            0.5
        );
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);

    const scroll = useScroll();

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);
        return shape;
    }, [curve]);

    useFrame((_state, delta) => {
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        )

        let boxPointIndex
        if (curPointIndex < 23000 ) {
            boxPointIndex = curPointIndex + 1000
        }
        else {
            boxPointIndex = 24000
        }
        const boxIndex = linePoints[ boxPointIndex ]
        const curPoint = linePoints[ curPointIndex ];

        cameraGroup.current.position.lerp(curPoint, delta * 24);

        boxRef.current.position.x = boxIndex.x
        boxRef.current.position.y = boxIndex.y
        boxRef.current.position.z = boxIndex.z

        const vec = new Vector3(boxIndex.x, boxIndex.y, boxIndex.z)

        cameraGroup.current.lookAt(vec);
    })

    return (
        <>
            <group ref={cameraGroup}>
                <PerspectiveCamera rotation-y={Math.PI} lookAt={[0, 0, 0]} position={[0, 1.4, -15]} fov={30} makeDefault/>
                <group scale={[0.5, 0.5, 0.5]} position={[0, 1, -3]}>
                    <Float floatIntensity={9} speed={7}>
                        {/*<mesh geometry={nodes.cube.geometry} material={materials["material"]}/>*/}
                    </Float>
                </group>
            </group>

            <Box ref={boxRef} position={[0, 0, -10]}>
                <meshStandardMaterial color="red"/>
            </Box>


            <group position={[3, -2.5, -27]} rotation-y={Math.PI / 2}>
                <mesh
                    geometry={nodes.stena.geometry}
                    position={[0, 1, -6]}
                >
                    <meshStandardMaterial color="red"/>
                </mesh>
            </group>

            <group position={[12, -3, -67]} rotation-y={Math.PI / 2}>
                <mesh
                    geometry={nodes.stena.geometry}
                    position={[0, 1, -6]}
                >
                    <meshStandardMaterial color="red"/>
                </mesh>
            </group>

            <group position={[6, -3, -87]} rotation-y={Math.PI / 2}>
                <mesh
                    geometry={nodes.stena.geometry}
                    position={[0, 1, -6]}
                >
                    <meshStandardMaterial color="red"/>
                </mesh>
            </group>

            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                steps: LINE_NB_POINTS,
                                bevelEnabled: false,
                                extrudePath: curve,
                            },
                        ]}
                    />
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent/>
                </mesh>
            </group>

        </>
    )
};

export default Experience;