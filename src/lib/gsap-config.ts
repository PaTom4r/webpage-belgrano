// src/lib/gsap-config.ts
// Single registration point for all GSAP plugins.
// Import from this file in every 'use client' component that uses GSAP.
// Never call gsap.registerPlugin() inside individual components.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
