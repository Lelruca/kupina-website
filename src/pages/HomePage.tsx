import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import TripsSection from '../components/TripsSection';
import MissionSection from '../components/MissionSection';
import LeaderSection from '../components/LeaderSection';
import FaqSection from '../components/FaqSection';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GallerySection from '../components/GallerySection';
import SocialMissionSection from '../components/SocialMissionSection';
import FinalCta from '../components/FinalCta';

export default function HomePage() {
  useDocumentMeta(
    'Неопалимая Купина — паломническая служба | Поездки по святым местам России',
    'Паломнические поездки по святым местам России с молитвой, содержательными экскурсиями и тёплым отношением к каждому. Посадка в Купавне, Железнодорожном, Реутове и у метро Новокосино.'
  );

  return (
    <main id="main-content">
      <Hero />
      <Advantages />
      <TripsSection />
      <MissionSection />
      <LeaderSection />
      <FaqSection />
      <ProcessSection />
      <TestimonialsSection />
      <GallerySection />
      <SocialMissionSection />
      <FinalCta />
    </main>
  );
}
