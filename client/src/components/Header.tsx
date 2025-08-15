import { motion } from 'framer-motion';
import { Typography } from 'antd';
import ThemeToggle from './ThemeToggle';
import { Image } from 'antd';
import fsl from '../../public/fslt.png'
const { Title } = Typography;

const services = ['YouTube', 'Instagram', 'Instagram Story'];

interface HeaderProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const HeaderComponent = ({ selectedService, setSelectedService }: HeaderProps) => {
  return (
    <header className="bg-transparent text-black dark:text-white  text-center p-5  flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-4">
      <motion.div
        // initial={{ y: -100 }}
        // animate={{ y: 0 }}
        // transition={{ type: 'tween', stiffness: 50 }}
        >
        <Title className="dark:text-white text-gray-800 bg-transparent flex justify-center items-center">
       <Image 
        src={fsl} 
        alt={`${selectedService} logo`} 
        height={150} 
        width={150} 
        // Add this class as well for good measure
        className="bg-transparent" 
      />
        {selectedService} Downloader
        </Title>
      </motion.div>
        <ThemeToggle />
        </div>
      <nav className="mt-4">
        <ul className="flex justify-center gap-20">
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
