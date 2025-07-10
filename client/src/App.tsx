import { useState } from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Image,
  Select,
  Spin,
  Alert,
  Row,
  Col,
} from 'antd';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from './apollo';
import { gql } from 'graphql-tag';
import GET_MEDIA_PREVIEW_STRING from './graphql/getMediaPreview.graphql?raw';
import HeaderComponent from './components/Header';

const GET_MEDIA_PREVIEW = gql(GET_MEDIA_PREVIEW_STRING);

const { Content } = Layout;
const { Title, Text } = Typography;

interface DownloadOption {
  quality: string;
  format: string;
  downloadUrl: string;
  hasAudio: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function App() {
  const [url, setUrl] = useState('');
  const [selectedDownload, setSelectedDownload] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('YouTube');
  const [getMediaPreview, { loading, error, data }] = useLazyQuery(
    GET_MEDIA_PREVIEW
  );

  const handleFetchPreview = () => {
    getMediaPreview({ variables: { url, service: selectedService } });
  };

  const handleDownload = () => {
    if (selectedDownload) {
      window.open(selectedDownload, '_blank');
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-900 text-white">
      <HeaderComponent selectedService={selectedService} setSelectedService={setSelectedService} />
      <Content className="p-4 sm:p-8">
        <motion.div
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Title level={3} className="text-center mb-6 text-white">
            Paste a link to get started
          </Title>
          <Form layout="vertical" onFinish={handleFetchPreview}>
            <Form.Item>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                size="large"
                className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                className="bg-blue-600 hover:bg-blue-700 border-none"
              >
                Get Preview
              </Button>
            </Form.Item>
          </Form>
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spin size="large" />
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Alert
                message="Error"
                description={error.message}
                type="error"
                showIcon
                className="mt-8 bg-red-900 text-white border-red-700"
              />
            </motion.div>
          )}
          {data && data.getMediaPreview && (
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <Card className="mt-8 bg-gray-800 text-white border-gray-700">
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} md={8}>
                    <Image
                      src={data.getMediaPreview.thumbnailUrl}
                      alt={data.getMediaPreview.title}
                      className="rounded-lg"
                    />
                  </Col>
                  <Col xs={24} md={16}>
                    <Title level={4} className="text-white">
                      {data.getMediaPreview.title}
                    </Title>
                    <Text className="text-gray-400">
                      Source: {data.getMediaPreview.source}
                    </Text>
                    <div className="mt-4">
                      <Select
                        placeholder="Select quality"
                        onChange={(value) => setSelectedDownload(value)}
                        className="w-full"
                        dropdownClassName="bg-gray-700 border-gray-600"
                      >
                        {data.getMediaPreview.downloadOptions.map(
                          (option: DownloadOption) => (
                            <Select.Option
                              key={option.quality}
                              value={option.downloadUrl}
                              className="text-white"
                            >
                              {option.quality} ({option.format}){' '}
                              {option.hasAudio ? '' : '(No Audio)'}
                            </Select.Option>
                          )
                        )}
                      </Select>
                      <Button
                        type="primary"
                        onClick={handleDownload}
                        disabled={!selectedDownload}
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 border-none"
                      >
                        Download
                      </Button>
                      {data.getMediaPreview.audioUrl && !selectedDownload?.includes('audio') && (
                        <Button
                          type="primary"
                          href={data.getMediaPreview.audioUrl}
                          target="_blank"
                          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 border-none"
                        >
                          Download Audio
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Content>
    </Layout>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;
