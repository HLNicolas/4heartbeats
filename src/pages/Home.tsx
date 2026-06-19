import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Wrench, Sparkles, Check, Star } from "lucide-react";

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-10 pb-16 pt-12 md:grid-cols-12 md:gap-12 md:py-20 lg:py-28">
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center">
            <span className="eyebrow">Momentos felices, sin preocupaciones</span>
            <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl text-primary">
              Disfruta de tu fiesta.{" "}
              <span className="text-terracotta italic">Nosotros nos encargamos</span> del resto.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Limpieza, montaje, repostería y decoración con el cuidado y calidez de una madre. Una sola agencia para que seas un invitado más en tu propia celebración.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cotizar" className="btn-primary">
                Cotizar mi evento <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/catalogo" className="btn-ghost">
                Ver catálogo
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-sage" />
              Personal de total confianza · Respuesta en menos de 24h
            </div>
          </div>
          
          <div className="md:col-span-6 lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-sand" aria-hidden="true"></div>
              <img
                src={`${import.meta.env.BASE_URL}assets/hero-event-5LMS3MNR.jpg`}
                alt="Mesa de postres y candy bar montada para un evento elegante"
                width="1600"
                height="1100"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
              />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-card p-4 shadow-card sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-sage/15 text-sage">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">El cuidado de una madre</p>
                    <p className="text-xs text-muted-foreground">Antecedentes + capacitación en confianza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allied list section (B2C Focus: Celebrations we cover) */}
      <section className="border-y border-border bg-sand/40">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Celebraciones que nos apasiona atender
          </span>
          <span className="font-display text-base text-primary/70">Bodas íntimas</span>
          <span className="font-display text-base text-primary/70">Cumpleaños familiares</span>
          <span className="font-display text-base text-primary/70">Baby Showers</span>
          <span className="font-display text-base text-primary/70">Comuniones</span>
          <span className="font-display text-base text-primary/70">Aniversarios</span>
          <span className="font-display text-base text-primary/70">Cenas en Casa</span>
        </div>
      </section>

      {/* Services split section */}
      <section className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Organiza sin estrés</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-primary">El soporte ideal para tu fiesta</h2>
          <p className="mt-4 text-muted-foreground">
            Servicios de apoyo y limpieza para que todo fluya, y detalles hechos a mano para que sea inolvidable.
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Card 1: Operativos */}
          <Link
            to="/servicios"
            className="group relative overflow-hidden rounded-3xl bg-card shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/service-cleaning-l_c3EHGw.jpg`}
                alt="Operaciones impecables"
                loading="lazy"
                width="1200"
                height="750"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <span className="eyebrow !text-foreground/60">Servicios de Soporte</span>
              </div>
              <h3 className="mt-2 text-2xl !text-foreground font-display">Despreocúpate de la logística</h3>
              <p className="mt-3 text-muted-foreground">
                Tu hogar o salón listo antes, durante y después del festejo. Personal cálido, puntual y de total confianza.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Limpieza previa y ayuda en montaje
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Apoyo en servicio de alimentos y vajilla
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Limpieza profunda post-evento (casa impecable)
                </li>
              </ul>
              <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-terracotta">
                Ver detalle <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>

          {/* Card 2: Creativos */}
          <Link
            to="/servicios"
            className="group relative overflow-hidden rounded-3xl bg-card shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/service-decor-nzMl6I_T.jpg`}
                alt="Detalles que enamoran"
                loading="lazy"
                width="1200"
                height="750"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-terracotta" />
                <span className="eyebrow !text-foreground/60">Repostería & Decoración</span>
              </div>
              <h3 className="mt-2 text-2xl !text-foreground font-display">Detalles hechos con amor</h3>
              <p className="mt-3 text-muted-foreground">
                Candy bars temáticos, repostería artesanal y recordatorios hechos a mano por nuestras emprendedoras.
              </p>
              <ul className="mt-5 space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Mesas de postres con recetas caseras
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Decoración personalizada según la temática
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" /> Artesanías y recuerdos hechos a mano
                </li>
              </ul>
              <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-terracotta">
                Ver detalle <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-20 lg:py-24">
          <div className="grid items-end gap-4 md:grid-cols-2">
            <div>
              <span className="eyebrow !text-terracotta">Cómo trabajamos</span>
              <h2 className="mt-3 text-3xl !text-primary-foreground sm:text-4xl">
                Tres pasos para tu tranquilidad
              </h2>
            </div>
            <p className="text-primary-foreground/75">
              Te respondemos en menos de 24 horas hábiles con una cotización clara y sin compromiso.
            </p>
          </div>
          
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="font-display text-3xl text-terracotta">01</span>
              <h3 className="mt-3 text-xl !text-primary-foreground">Cuéntanos tu idea</h3>
              <p className="mt-2 text-sm text-primary-foreground/75">
                Por formulario o WhatsApp. Qué celebras, fecha y lugar del evento.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="font-display text-3xl text-terracotta">02</span>
              <h3 className="mt-3 text-xl !text-primary-foreground">Recibe tu propuesta</h3>
              <p className="mt-2 text-sm text-primary-foreground/75">
                Cotización adaptada a tu número de invitados y necesidades de apoyo.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="font-display text-3xl text-terracotta">03</span>
              <h3 className="mt-3 text-xl !text-primary-foreground">Disfruta tu día</h3>
              <p className="mt-2 text-sm text-primary-foreground/75">
                Nuestro equipo llega puntual, uniformado y listo para hacerse cargo de todo.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Catalog Preview Section */}
      <section className="container-page py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Catálogo</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-primary">Celebraciones recientes</h2>
          </div>
          <Link to="/catalogo" className="text-sm font-semibold text-terracotta hover:underline">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Recent item 1 */}
          <article className="group overflow-hidden rounded-2xl bg-card shadow-soft">
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/service-decor-nzMl6I_T.jpg`}
                alt="Boda íntima en jardín"
                loading="lazy"
                width="1200"
                height="900"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Decoración + candy bar
              </p>
              <h3 className="mt-1 text-lg !text-foreground font-display">Boda íntima en jardín</h3>
            </div>
          </article>

          {/* Recent item 2 */}
          <article className="group overflow-hidden rounded-2xl bg-card shadow-soft">
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/service-candy-CCU3OixR.jpg`}
                alt="Bautizo familiar"
                loading="lazy"
                width="1200"
                height="900"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Artesanías + montaje
              </p>
              <h3 className="mt-1 text-lg !text-foreground font-display">Bautizo familiar</h3>
            </div>
          </article>

          {/* Recent item 3 */}
          <article className="group overflow-hidden rounded-2xl bg-card shadow-soft">
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/service-cleaning-l_c3EHGw.jpg`}
                alt="Lanzamiento corporativo"
                loading="lazy"
                width="1200"
                height="900"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Limpieza + apoyo
              </p>
              <h3 className="mt-1 text-lg !text-foreground font-display">Cumpleaños temático</h3>
            </div>
          </article>
        </div>
      </section>

      {/* Impact Model Section */}
      <section className="bg-sand">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center lg:py-28">
          <div>
            <span className="eyebrow">Modelo de impacto</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-primary">
              Cada celebración genera ingresos directos a hogares liderados por madres.
            </h2>
            <p className="mt-5 text-muted-foreground">
              No somos una fundación de beneficencia. Somos una agencia profesional que capacita, contrata y dignifica el trabajo de madres jefas de hogar. Tú contratas una ayuda para tu fiesta; ellas construyen autonomía económica.
            </p>
            <Link to="/impacto" className="btn-ghost mt-8">
              Conoce el modelo
            </Link>
          </div>
          
          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <dt className="font-display text-4xl text-terracotta lg:text-5xl">+120</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Madres contratadas</dd>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <dt className="font-display text-4xl text-terracotta lg:text-5xl">+450</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Fiestas atendidas</dd>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <dt className="font-display text-4xl text-terracotta lg:text-5xl">100%</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Confianza verificada</dd>
            </div>
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <dt className="font-display text-4xl text-terracotta lg:text-5xl">24h</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Propuesta clara</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Testimonials Section (B2C Focus: Families) */}
      <section className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonios de anfitriones</span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-primary">Lo que dicen las familias de nuestro equipo</h2>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Testimonial 1 */}
          <figure className="flex flex-col rounded-2xl bg-card p-7 shadow-soft">
            <div className="flex gap-1 text-terracotta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-foreground/85 leading-relaxed">
              &quot;Llegaron antes que yo y se fueron después de que todos salieron. Mi casa nunca había quedado tan limpia y ordenada tras el cumpleaños de mi hijo de 8 años. ¡Pude sentarme a disfrutar con mis amigos!&quot;
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <p className="font-semibold text-foreground">Andrea M.</p>
              <p className="text-sm text-muted-foreground">Mamá de Mateo</p>
            </figcaption>
          </figure>

          {/* Testimonial 2 */}
          <figure className="flex flex-col rounded-2xl bg-card p-7 shadow-soft">
            <div className="flex gap-1 text-terracotta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-foreground/85 leading-relaxed">
              &quot;Pedí un candy bar y apoyo para el bautizo de mi sobrina en jardín. Todo llegó impecable, delicioso y con una calidez que se notaba en cada detalle.&quot;
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <p className="font-semibold text-foreground">Camilo R.</p>
              <p className="text-sm text-muted-foreground">Organizador familiar</p>
            </figcaption>
          </figure>

          {/* Testimonial 3 */}
          <figure className="flex flex-col rounded-2xl bg-card p-7 shadow-soft">
            <div className="flex gap-1 text-terracotta">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-foreground/85 leading-relaxed">
              &quot;Contratamos el servicio completo para nuestra boda civil íntima en casa. El personal fue súper puntual, cariñoso y muy profesional. Recomiendo delegar en ellas al 100%.&quot;
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4">
              <p className="font-semibold text-foreground">Daniela P.</p>
              <p className="text-sm text-muted-foreground">Novia</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Allied Business Callout (B2C Focus: Plan your party) */}
      <section className="container-page pb-20">
        <div className="overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow !text-terracotta">Despreocúpate de todo</span>
              <h2 className="mt-3 text-3xl !text-primary-foreground sm:text-4xl">
                ¿Planeas una reunión familiar o fiesta en casa?
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Deja la logística, atención y limpieza profunda final en manos expertas. Tarifas claras y disponibilidad flexible para tu hogar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/cotizar" className="btn-primary">
                Cotizar mi fiesta
              </Link>
              <Link
                to="/servicios"
                className="btn-ghost border-white/40 text-white hover:bg-white hover:text-primary"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-primary">Lo que nos preguntan los anfitriones</h2>
          </div>
          
          <div className="divide-y divide-border">
            {/* FAQ 1 */}
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground outline-none">
                ¿Hacen eventos pequeños en casas o departamentos?
                <span className="mt-1 text-terracotta transition-transform group-open:rotate-45 font-display text-xl select-none">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                ¡Sí, por supuesto! Atendemos desde pequeñas cenas íntimas de 10 o 20 personas en casa, hasta eventos medianos de 150+ invitados. Nos adaptamos perfectamente a los espacios domésticos cuidando cada rincón.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground outline-none">
                ¿Cómo sé que el personal es de confianza para entrar a mi hogar?
                <span className="mt-1 text-terracotta transition-transform group-open:rotate-45 font-display text-xl select-none">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                La confianza es nuestra mayor prioridad. Cada madre de nuestro equipo pasa por una verificación estricta de antecedentes judiciales, referencias personales, entrevistas individuales de aptitud y capacitación intensiva antes de realizar cualquier servicio.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground outline-none">
                ¿En qué zonas de la ciudad operan?
                <span className="mt-1 text-terracotta transition-transform group-open:rotate-45 font-display text-xl select-none">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Operamos en la ciudad principal y todo su cinturón metropolitano. Si el lugar es de difícil acceso o queda fuera de cobertura, evaluamos la solicitud y te informamos los costes adicionales de transporte.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-foreground outline-none">
                ¿Qué incluye el cobro y cuánto tardan en darme precio?
                <span className="mt-1 text-terracotta transition-transform group-open:rotate-45 font-display text-xl select-none">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Nuestros cobros de soporte son claros y transparentes (sin recargos ocultos). Recibirás tu cotización detallada en menos de 24 horas hábiles tras rellenar el formulario de contacto o enviarnos un WhatsApp.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};
