
import React, { use, useEffect, useMemo, useRef, useState  } from 'react'
import { useGraph, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { button, useControls } from "leva";

import * as THREE from "three";


const corresponding = {
    A: "viseme_PP",
    B: "viseme_kk",
    C: "viseme_I",
    D: "viseme_AA",
    E: "viseme_O",
    F: "viseme_U",
    G: "viseme_FF",
    H: "viseme_TH",
    X: "viseme_PP",
  };


export function Avatar(props) {

    const group = useRef();

// AUDIO

    const {
        playAudio,
        script,
        headFollow,
        smoothMorphTarget,
        morphTargetSmoothing,
      } = useControls({
        playAudio: false,
        headFollow: false,
        smoothMorphTarget: true,
        morphTargetSmoothing: 0.5,
        script: {
          value: "intro",
          options: ["lily", "joke","valentine","greet","song","intro"],
        },
        
      });

    const audio = useMemo(() => new Audio(`/audio/${script}.wav`), [script]);      
    const jsonFile = useLoader(THREE.FileLoader, `audio/${script}.json`);
    let lipsync;
    try {
        lipsync = JSON.parse(jsonFile);
    } catch (error) {
        console.error("Failed to parse JSON file:", error);
        lipsync = { mouthCues: [] };
    }

// EXPRESSIONS ACCORDING TO AUDIO 


    useFrame(() => {
        const currentAudioTime = audio.currentTime;
        if (audio.paused || audio.ended) {
          setAnimation("Stand");
          return;
        }
    
        Object.values(corresponding).forEach((value) => {
          if (!smoothMorphTarget) {
            nodes.Wolf3D_Head.morphTargetInfluences[
              nodes.Wolf3D_Head.morphTargetDictionary[value]
            ] = 0;
            nodes.Wolf3D_Teeth.morphTargetInfluences[
              nodes.Wolf3D_Teeth.morphTargetDictionary[value]
            ] = 0;
          } else {
            nodes.Wolf3D_Head.morphTargetInfluences[
              nodes.Wolf3D_Head.morphTargetDictionary[value]
            ] = THREE.MathUtils.lerp(
              nodes.Wolf3D_Head.morphTargetInfluences[
                nodes.Wolf3D_Head.morphTargetDictionary[value]
              ],
              0,
              morphTargetSmoothing
            );
    
            nodes.Wolf3D_Teeth.morphTargetInfluences[
              nodes.Wolf3D_Teeth.morphTargetDictionary[value]
            ] = THREE.MathUtils.lerp(
              nodes.Wolf3D_Teeth.morphTargetInfluences[
                nodes.Wolf3D_Teeth.morphTargetDictionary[value]
              ],
              0,
              morphTargetSmoothing
            );
          }
        });
    
        for (let i = 0; i < lipsync.mouthCues.length; i++) {
          const mouthCue = lipsync.mouthCues[i];
          if (
            currentAudioTime >= mouthCue.start &&
            currentAudioTime <= mouthCue.end
          ) {
            if (!smoothMorphTarget) {
              nodes.Wolf3D_Head.morphTargetInfluences[
                nodes.Wolf3D_Head.morphTargetDictionary[
                  corresponding[mouthCue.value]
                ]
              ] = 1;
              nodes.Wolf3D_Teeth.morphTargetInfluences[
                nodes.Wolf3D_Teeth.morphTargetDictionary[
                  corresponding[mouthCue.value]
                ]
              ] = 1;
            } else {
              nodes.Wolf3D_Head.morphTargetInfluences[
                nodes.Wolf3D_Head.morphTargetDictionary[
                  corresponding[mouthCue.value]
                ]
              ] = THREE.MathUtils.lerp(
                nodes.Wolf3D_Head.morphTargetInfluences[
                  nodes.Wolf3D_Head.morphTargetDictionary[
                    corresponding[mouthCue.value]
                  ]
                ],
                1,
                morphTargetSmoothing
              );
              nodes.Wolf3D_Teeth.morphTargetInfluences[
                nodes.Wolf3D_Teeth.morphTargetDictionary[
                  corresponding[mouthCue.value]
                ]
              ] = THREE.MathUtils.lerp(
                nodes.Wolf3D_Teeth.morphTargetInfluences[
                  nodes.Wolf3D_Teeth.morphTargetDictionary[
                    corresponding[mouthCue.value]
                  ]
                ],
                1,
                morphTargetSmoothing
              );
            }
    
            break;
          }
        }
      });
    
      useEffect(() => {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary["viseme_I"]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_I"]
        ] = 1;
        if (playAudio) {
          audio.play();
          if (script === "lily") {
            setAnimation("Talk");
          } 
          else if (script === "greet"){
            setAnimation("Cry");
          }

          else if(script === "joke"){
            setAnimation("Laugh");

          }
          else if(script === "intro"){
            setAnimation("Intro");

          }

          else if(script === "song"){
            setAnimation("Dance");

          }
          else {
            setAnimation("Talk2");
          }
        } else {
          setAnimation("Idle");
          audio.pause();
        }
      }, [playAudio, script]);



// MESH GRAPH
        const { scene } = useGLTF('/models/67a9cb59555677b093923028.glb')
        const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
        const { nodes, materials } = useGraph(clone)


// ANIMATIONS
    
        const animations = useMemo(() => {
            const twist = useFBX("/animations/Twist Dance.fbx").animations;
            const hiphop = useFBX("/animations/Hip Hop Dancing.fbx").animations;
            const idle = useFBX("/animations/Dwarf Idle.fbx").animations;
            const cry = useFBX("/animations/Crying.fbx").animations;
            const talk = useFBX("/animations/Talking.fbx").animations;
            const talk2 = useFBX("/animations/Talking (1).fbx").animations;
            const laugh = useFBX("/animations/Laughing.fbx").animations;
            const stand = useFBX("/animations/Standing Idle.fbx").animations;
            const intro = useFBX("/animations/Standing Greeting (1).fbx").animations;
        
        const renameAnimation = (anim, name) => {
          if (anim?.length) {
            anim[0].name = name;
          } else {
            console.warn(`${name} animation is missing`);
          }
          return anim;
        };
      
        return {
          Dance: renameAnimation(twist, "Dance"),
          Hiphop: renameAnimation(hiphop, "Hiphop"),
          Idle: renameAnimation(idle, "Idle"),
          Cry: renameAnimation(cry, "Cry"),
          Talk: renameAnimation(talk, "Talk"),
          Talk2: renameAnimation(talk2, "Talk2"),
          Laugh: renameAnimation(laugh, "Laugh"),
          Stand: renameAnimation(stand, "Stand"),
          Intro: renameAnimation(intro, "Intro"),
        };
      }, []);



        const [animation, setAnimation] = useState("Stand");
          
            
        const { actions } = useAnimations([...animations.Dance,...animations.Intro, ...animations.Stand, ...animations.Hiphop, ...animations.Idle, ...animations.Cry, ...animations.Talk, ...animations.Talk2, ...animations.Laugh], group);
      
        // useEffect(() => {
        //     console.log(nodes.Wolf3D_Head.morphTargetDictionary);
        //     nodes.Wolf3D_Head.morphTargetInfluences[
        //         nodes.Wolf3D_Head.morphTargetDictionary["eyeBlinkRight"]
        //     ] = 1;
        // }, [nodes.Wolf3D_Head.morphTargetDictionary, nodes.Wolf3D_Head.morphTargetInfluences]);

        

        useEffect(() => {
            if (actions && actions[animation]) {
            actions[animation].reset().fadeIn(0.5).play();
            return () => actions[animation].fadeOut(0.5);
            } else {
            console.warn(`Action for animation '${animation}' is undefined`);
            }
        }, [animation, actions]);


        useFrame((state) => {
          if (headFollow) {
            group.current.getObjectByName("Head").lookAt(state.camera.position);
          }
          // else{
          //   group.current.getObjectByName("Head").lookAt(0,0,0);

          // }
          
        });

      
// AVATAR MESH

        return (
            <group {...props} dispose={null} ref={group} >
            <primitive object={nodes.Hips} />
            <skinnedMesh geometry={nodes['hair-60'].geometry} material={materials.M_Hair_60} skeleton={nodes['hair-60'].skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
            <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
            <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
            <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
            <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
            <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
            </group>
        )
        }

        useGLTF.preload('/models/67a9cb59555677b093923028.glb')



///////////////////////////////////////////////////////////////




