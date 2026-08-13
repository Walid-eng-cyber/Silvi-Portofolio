import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { contact } from '../data/content';

export function Contact() {
  return (
    <footer id="contact" className="pb-4 md:pb-[22px]">
      <Container inset="edge">
        <Reveal>
          <div className="rounded-[20px] bg-black px-6 py-10 text-white sm:rounded-[32px] sm:px-8 sm:py-12 md:px-[66px] md:py-[45px]">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
              <h2 className="text-[18px] font-extrabold leading-[1.1] sm:text-[20px]">
                {contact.label}
              </h2>

              {/*
                The email is a single 30-character token. Without an explicit
                break it pushes the panel wider than the viewport on a phone, so
                it is allowed to wrap mid-word.
              */}
              <ul className="text-[clamp(16px,4.4vw,20px)] font-medium leading-[1.6] md:w-[335px]">
                {contact.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-block break-all py-1 underline decoration-from-font underline-offset-2 transition-opacity duration-300 hover:opacity-60 focus-visible:opacity-60 motion-reduce:transition-none"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-16 max-w-[615px] text-[clamp(24px,6vw,42px)] font-extrabold leading-[1.1] [text-wrap:balance] md:ml-auto md:mt-[180px]">
              {contact.statement}
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
