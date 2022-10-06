import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  Box,
  Text,
  Flex,
  Grid,
  Avatar,
  Heading,
  Container,
  Breadcrumb,
  useColorMode,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
} from '@chakra-ui/react'
import moment from 'moment'
import { API } from '@/common/api/api'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { NextSeo } from 'next-seo'
import { CircleSpinner } from 'react-spinners-kit'
import router from 'next/router'

const Layout = dynamic(() => import('@/components/organism/Layout/index'))
const CardMateri = dynamic(() => import('@/components/atoms/CardMateri/index'))
const DataNotFound = dynamic(() =>
  import('@/components/organism/DataNotFound/index'),
)

export default function detailMateri() {
  const { colorMode } = useColorMode()
  const [data, setData] = useState([])
  const [detailCourse, setDetailCourse] = useState(null)

  useEffect(() => {
    if (detailCourse) {
      API.get(`/course-speaker/${detailCourse.id_speakers}?page=1`)
        .then((res) => {
          setData(res.data.data.course.data)
        })
        .catch((error) => {
          console.log('err', error)
        })
    }
  }, [detailCourse])

  useEffect(() => {
    API.get(`/course-detail/${router.query.slug}`)
      .then((res) => {
        setDetailCourse(res.data.data.course)
      })
      .catch((error) => {
        console.error('res', error)
      })
  }, [])

  return (
    <>
      {!detailCourse ? (
        <Flex h="100vh" alignItems="center" justifyContent="center">
          <CircleSpinner size={70} color="#1EA59A" loading={true} />
        </Flex>
      ) : (
        <>
          <NextSeo
            title={`Materi | ${detailCourse.title}`}
            description={detailCourse.description}
            openGraph={{
              url: 'https://eksportin.vercel.app',
              title: `Materi | ${detailCourse.title}`,
              description: detailCourse.description,
              site_name: 'Eksportin.vercel.app',
            }}
          />
          <Layout>
            <Container
              maxW="full"
              p="10"
              h="max-content"
              px={{ base: '5', md: '10', lg: '40', xl: '20', '3xl': '24' }}
              w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}
              centerContent
            >
              <Flex mt={{ base: '16', '3xl': '36' }}>
                <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materi">Materi</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem
                    isCurrentPage
                    color={colorMode === 'light' ? '#1EA59A' : 'blue.200'}
                  >
                    <BreadcrumbLink>{detailCourse.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Flex mt="3">
                <Text
                  color={colorMode === 'light' ? '#21383E' : 'white'}
                  fontWeight="extrabold"
                  letterSpacing={'-.0.001rem'}
                  lineHeight={'-.0.001rem'}
                  fontSize={{ base: 'sm', '3xl': 'xl' }}
                >
                  {detailCourse.category}
                </Text>
              </Flex>
              <Flex mt="3">
                <Heading
                  as="h1"
                  letterSpacing={'-.0.01rem'}
                  fontSize={{
                    base: '3xl',
                    md: '3xl',
                    lg: '7xl',
                    xl: '5xl',
                    '3xl': '6xl',
                  }}
                  textAlign="center"
                >
                  {detailCourse.title}
                </Heading>
              </Flex>
              <Flex mt="5">
                <Box p="1">
                  <Text
                    color={colorMode === 'light' ? '#21383E' : 'white'}
                    fontWeight="extrabold"
                    letterSpacing={'-.0.001rem'}
                    lineHeight={'-.0.001rem'}
                    fontSize={{ base: 'sm', '3xl': 'xl' }}
                  >
                    Dipublikasikan sejak{' '}
                    {moment(detailCourse.created_at)
                      .locale('id')
                      .format('DD MMMM YYYY')}
                  </Text>
                </Box>
              </Flex>
              <Flex mt="3">
                <Flex wrap="wrap" alignItems="center">
                  <Avatar
                    name={detailCourse.speaker}
                    src={
                      detailCourse.photos
                        ? `https://eksportin.com/${detailCourse.photos}` : 
                        "https://bit.ly/dan-abramov"}
                    size="sm"
                  />
                  <Text ml="3">{detailCourse.speaker}</Text>
                </Flex>
              </Flex>
              <Flex
                top="5"
                w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}
                zIndex={-1}
                height="2px"
                position="relative"
                backgroundColor="gray.200"
                mb="5"
              />
               <Box w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}>
                  <Image
                    src={
                      detailCourse.photo
                        ? `https://eksportin.com/${detailCourse.photo}`
                        : 'https://bit.ly/sage-adebayo'
                    }
                    alt={detailCourse.title}
                    loading="lazy"
                    objectFit="cover"
                    w="full"
                    h="300px"
                  />
                </Box>
              <Flex
                mt="3"
                as="section"
                wrap="wrap"
                w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}
              >
                <div className='detail-course'>
                  <div
                    id="description-course"
                    dangerouslySetInnerHTML={{ __html: detailCourse.description }}
                  />
                </div>
              </Flex>
              <Flex
                top="5"
                w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}
                zIndex={-1}
                height="2px"
                position="relative"
                backgroundColor="gray.200"
                mb="5"
              />
              <Flex mt="10" w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}>
                <Text
                  color={colorMode === 'light' ? '#21383E' : 'white'}
                  fontWeight="extrabold"
                  letterSpacing={'-.0.001rem'}
                  lineHeight={'-.0.001rem'}
                  fontSize={{ base: 'sm', '3xl': '2xl' }}
                >
                  Materi Lainnya dari {detailCourse.speaker}
                </Text>
              </Flex>
              <Flex mt="10" w={{ base: 'full', '2xl': '4xl', '3xl': '7xl' }}>
                <Grid
                  templateColumns={
                    data && data.length > 0
                      ? { base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }
                      : 'repeat(1, 1fr)'
                  }
                  gap={{ base: 6, '3xl': 14 }}
                  w="full"
                >
                  {data && data.length > 0 ? (
                    data.map((item, index) => {
                      return <CardMateri key={index} data={item} isDetail={true}/>
                    })
                  ) : (
                    <DataNotFound />
                  )}
                </Grid>
              </Flex>
            </Container>
          </Layout>
        </>
      )}
    </>
  )
}
