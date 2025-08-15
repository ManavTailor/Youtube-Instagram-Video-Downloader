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
import { gql } from 'graphql-tag';
import { useLazyQuery, ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import GET_MEDIA_PREVIEW_STRING from './graphql/getMediaPreview.graphql?raw';
import HeaderComponent from './components/Header';
import ThemeProvider from './ThemeProvider';

const GET_MEDIA_PREVIEW = gql(GET_MEDIA_PREVIEW_STRING);
const { Content, Footer } = Layout;
const { Title, Text } = Typography;

interface DownloadOption {
  quality: string;
  format: string;
  downloadUrl: string;
  hasAudio: boolean;
}

function App() {
  const [url, setUrl] = useState('');
  const [selectedDownload, setSelectedDownload] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('YouTube');
  const [getMediaPreview, { loading, error, data }] = useLazyQuery(GET_MEDIA_PREVIEW);

  const handleFetchPreview = () => {
    getMediaPreview({ variables: { url, service: selectedService } });
  };

  const handleDownload = () => {
    if (selectedDownload) window.open(selectedDownload, '_blank');
  };

  // Add a helper to determine if Instagram multi-media
  const isInstagramMulti = selectedService.toLowerCase().includes('instagram') && data?.getMediaPreview?.mediaItems?.length > 1;

  return (
    <Layout className="min-h-screen bg-gradient-to-b from-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors">
      <HeaderComponent selectedService={selectedService} setSelectedService={setSelectedService} />
      
     
      <Content className="flex flex-col justify-between min-h-[92vh]">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Text className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl">
              Paste a YouTube or Instagram (post, reel, or story) link and get your video in HD format in seconds.<br/>
              <span className="block mt-2 text-sm text-blue-600 dark:text-blue-300">Supported: YouTube, Instagram Posts, Reels, Stories</span>
            </Text>
            <Form layout="vertical" onFinish={handleFetchPreview} className="mt-10">
              <Form.Item>
                <Input
                  placeholder="Paste YouTube or Instagram link (post, reel, or story)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  size="large"
                  className="bg-gray-100 dark:placeholder:text-gray-400 dark:bg-gray-800 text-gray-900 dark:text-white border-none rounded-xl"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="w-full bg-red-600 hover:bg-red-700 border-none rounded-xl"
                >
                  Fetch Preview
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>

        {/* Features Section */}
        {!data && !loading && (
          <section className="py-16 px-4 sm:px-6 bg-gray-900 border-t border-gray-800">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
              {[
                { title: 'No Watermark', icon: '💧' },
                { title: 'HD & MP3 Available', icon: '🎵' },
                { title: 'Free & Fast', icon: '⚡' },
              ].map(({ title, icon }, i) => (
                <div
                  key={i}
                  className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-2">{icon}</div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preview Result */}
        {loading && (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto mt-4">
            <Alert
              message="Error"
              description={error.message}
              type="error"
              showIcon
              className="bg-red-900 text-white border-red-700"
            />
          </div>
        )}

        {data?.getMediaPreview && (
          <section className="max-w-5xl mx-auto mt-12 px-4">
            <Card className="card-modern bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white transition-colors">
              <Row gutter={[16, 16]} align="middle">
                
                {data.getMediaPreview.mediaItems?.length > 0 ? null :
                <Col xs={24} md={8}>
                  <Image
                    src={data.getMediaPreview.thumbnailUrl}
                    alt="Thumbnail"
                    className="rounded-xl"
                  />
                </Col> 
              } 

                <Col xs={24} md={16}>
                  <Title level={4} className="text-gray-900 dark:text-white">{data.getMediaPreview.title}</Title>
                  <Text className="text-gray-600 dark:text-gray-400 mb-4 block">
                    Source: {data.getMediaPreview.source}
                  </Text>

                  {/* Instagram multi-media (carousel/stories) */}
                  {isInstagramMulti ? (
                    <div className="space-y-4">
                      {data.getMediaPreview.mediaItems.map((item: DownloadOption, i: number) => (
                        <div key={i} className="flex items-center gap-4">
                          {/* Preview for each item */}
                          {item.format === 'mp4' ? (
                            <video src={item.downloadUrl} controls width={120} height={120} className="rounded-md" />
                          ) : (
                             <Image
        src={item.downloadUrl}
        alt={`Preview ${i + 1}`}
        width={120}
        height={120}
        className="rounded-md"
        preview={false}
        fallback="https://via.placeholder.com/120?text=Image+Unavailable"
      />
                          )}
                          <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-green-600 hover:bg-green-700 text-white border-none rounded-md">
                              Download {item.format === 'mp4' ? 'Video' : 'Image'} #{i + 1}
                            </Button>
                          </a>
                          <span className="text-gray-500 dark:text-gray-300">{item.format.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <Select
                        placeholder="Select quality"
                        onChange={(val) => setSelectedDownload(val)}
                        className="w-full "
                      >
                        {data.getMediaPreview.downloadOptions.map((opt: DownloadOption, i: number) => (
                          <Select.Option key={i} value={opt.downloadUrl}>
                            {opt.quality} - {opt.format} {selectedService === 'YouTube' ? opt.hasAudio ? '' : '(No Audio)' : ''}
                          </Select.Option>
                        ))}
                      </Select>

                      <Button
                        onClick={handleDownload}
                        disabled={!selectedDownload}
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white border-none rounded-md"
                      >
                        Download Video
                      </Button>

                      {data.getMediaPreview.audioUrl && (
                        <Button
                          href={data.getMediaPreview.audioUrl}
                          target="_blank"
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md"
                        >
                          Download Audio Only
                        </Button>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </section>
        )}
      </Content>
      {/* Footer */}
      <Footer className="text-center text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors">
        © {new Date().getFullYear()} YouTube Downloader. Built with ❤️ by Manav Tailor
      </Footer>
    </Layout>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default AppWrapper;
