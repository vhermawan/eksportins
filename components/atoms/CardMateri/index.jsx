import React from 'react'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Button,
} from '@chakra-ui/react'
import moment from 'moment'
import { FaTrash } from 'react-icons/fa'
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText'
import { useMediaQuery } from '@chakra-ui/react'

const CardMateri = (props) => {
  const [isLargerThan360] = useMediaQuery('(min-width: 1080px)')
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {moment(props.data.created_at).format('DD MMMM YYYY')}
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: 'gray.500' }}
          >
            <EllipsisText
              text={props.data.category}
              length={props.isDetail ? 9 : 19  }
            />
          </Link>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize="lg"
            color={useColorModeValue('gray.700', 'white')}
            fontWeight="700"
            _hover={{
              color: useColorModeValue('gray.600', 'gray.200'),
              textDecor: 'underline',
            }}
            onClick={() => props.setSlugCourse(props.data.slug)}
          >
            <EllipsisText
              text={props.data.title}
              length={props.isProfile ? 50 : 30}
            />
          </Link>
          <Box>
            <div
              id="description"
              dangerouslySetInnerHTML={{ __html: props.data.description }}
            />
          </Box>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color={useColorModeValue('brand.600', 'brand.400')}
            _hover={{ textDecor: 'underline' }}
            onClick={() => props.setSlugCourse(props.data.slug)}
            display={props.isDetail ? 'none' : 'flex'}
          >
            Read more
          </Link>

          <Button
            leftIcon={<FaTrash />}
            display={props.isProfile ? 'flex' : 'none'}
            colorScheme="red"
            variant="solid"
            size="sm"
            aria-label={`Umkm ${props.data.title}`}
            onClick={() => props.deleteCourse(props.data.id_course_umkm)}
          >
            Delete Course
          </Button>

          <Flex alignItems="center" display={props.isDetail || !isLargerThan360 ? "none" : "flex"}>
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              loading="lazy"
              display={{ base: 'none', sm: 'block' }}
              src= {
                props.data.photos ? 
                `https://eksportin.com/${props.data.photos}` :
                "https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
              }
              alt="avatar"
            />
            <Link
              color={useColorModeValue('gray.700', 'gray.200')}
              fontWeight="700"
              cursor="pointer"
            >
              <EllipsisText
                text={props.data.speaker}
                length={12}
              />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default CardMateri
