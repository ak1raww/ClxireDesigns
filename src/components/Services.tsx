import FadeIn from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="flex flex-col px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white relative z-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase leading-none tracking-tight text-center w-full mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0C0C0C' }}
        >
          {t.services.heading}
        </h2>
      </FadeIn>

      <div className="flex flex-col w-full items-center">
        {t.services.items.map((service, i) => (
          <FadeIn
            key={i}
            delay={i * 0.1}
            y={30}
            className="flex flex-col items-center w-full max-w-5xl"
          >
            {i > 0 && (
              <div
                className="w-full"
                style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
              />
            )}
            <div className="flex items-start gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12 w-full">
              <span
                className="font-black uppercase leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col gap-2 sm:gap-4 md:gap-5 pt-1">
                <span
                  className="font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: '#0C0C0C' }}
                >
                  {service.title}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', color: '#0C0C0C', opacity: 0.6 }}
                >
                  {service.desc}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

