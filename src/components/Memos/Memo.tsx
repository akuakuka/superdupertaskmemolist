import React, { useRef, useEffect } from 'react';
import { renderToString } from 'react-dom/server'
import IMemo from '../../models/Memo';
import { Flex, Box, Text, Badge, IconButton, Icon, Image, AspectRatioBox } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMemo } from '../../state/thunks/memoThunk';
//@ts-ignore
import { leafletImage } from 'leaflet-image';
import L from 'leaflet'
import { Map, Marker, TileLayer, Popup } from "react-leaflet"
//@ts-ignore
//import nodeHtmlToImage from 'node-html-image'

interface IMemoProps {
  Memo: IMemo;
}

export const LocationImage = (props: IMemoProps) => {

  const position = { lat: props.Memo.Location.latitude, lng: props.Memo.Location.longitude }

  return (
    <>
      <Box height="600px" width="500px">


        <Map
          //@ts-ignore
          center={position}
          zoom={3}
          style={{ height: "100vh", marginLeft: "5rem" }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </Box>
    </>
  )
}

export const Memo = (props: IMemoProps) => {
  const dateNow = new Date()
  const memoDate = new Date(props.Memo.createdDate)
  const age = dateNow.getTime() - memoDate.getTime()
  let isNew = false;
  //  259200000
  //  1625569
  if (age < 25920000) {
    isNew = true;
  }
  if (props.Memo.Location) {

    const html = renderToString(<LocationImage Memo={props.Memo} />)
    console.log(html)

  }
  const { content } = props.Memo;
  const dispatch = useDispatch();

  const handleLocationImage = async () => {
    var map = L.map('map', undefined).setView([38.9, -77.03], 14);
    //@ts-ignore
    leafletImage(map, function (err, canvas) {

      var img = document.createElement('img');
      img.src = canvas.toDataURL();
      console.log(img)
      console.log(err)
      console.log(canvas)
    });
  }

  const handleDelete = async () => {
    await dispatch(deleteMemo(props.Memo))
  }

  return (

    <Box maxH="800px" maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" backgroundColor="#909090">
      <Box p="6">
        <Box d="flex" alignItems="baseline">

          <Box
            color="white"
            letterSpacing="wide"
            fontSize="xs"
          >
            {content}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >

        </Box>
        {props.Memo.Location ? <LocationImage Memo={props.Memo}></LocationImage> : <div>lkasdfjjklasdf</div>}
        {props.Memo.Picture ? 
       <AspectRatioBox maxW="400px">
        <Image objectFit="fill" src={props.Memo.Picture.pictureURL}></Image> 
        </AspectRatioBox>
        : <div>picpicpictutuurre</div>}
       
        <Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            <Icon name="small-add" size="24px" />
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};
