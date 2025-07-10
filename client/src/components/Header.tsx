import { motion } from 'framer-motion';
import { Typography } from 'antd';

const { Title } = Typography;

const services = ['YouTube', 'Instagram', 'Instagram Story'];

interface HeaderProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const HeaderComponent = ({ selectedService, setSelectedService }: HeaderProps) => {
  return (
    <header className="bg-transparent text-white text-center p-8">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <Title className="text-white">
          &#x1f4e5; Universal Media Downloader
        </Title>
      </motion.div>
      <nav className="mt-4">
        <ul className="flex justify-center gap-8">
          {services.map((service) => (
            <li
              key={service}
              className="relative cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <span className="text-lg">{service}</span>
              {selectedService === service && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 right-0 h-1 bg-blue-500"
                  layoutId="underline"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
