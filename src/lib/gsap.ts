'use client'

import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger)

export { gsap, useGSAP, ScrollTrigger }
