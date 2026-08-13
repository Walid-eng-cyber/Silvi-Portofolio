import { motion, useReducedMotion } from 'framer-motion';
import { Container } from './ui/Container';
import { hero } from '../data/content';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="pt-2 md:pt-[7px]">
      <Container>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-[39px]">
          {/*
            The wordmark is the page. It keeps its exact 590 x 351.0987 ratio so
            the counters and overlaps never distort, and shrinks with the column
            below the lg breakpoint.
          */}
          <motion.img
            src={hero.wordmark}
            alt={hero.wordmarkAlt}
            width={590}
            height={351}
            className="w-full max-w-[590px] shrink-0"
            style={{ aspectRatio: '590 / 351.0987' }}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/*
            The tagline is capped at 281px on desktop to match the frame, but a
            cap that tight on a phone forces an awkward four-line rag, so the
            cap only applies from lg up.
          */}
          <motion.h1
            className="text-[clamp(18px,4.8vw,28px)] font-bold leading-[1.15] [text-wrap:balance] lg:max-w-[281px]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.tagline}
          </motion.h1>
        </div>
      </Container>
    </section>
  );
}
