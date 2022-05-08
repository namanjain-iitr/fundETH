// {((token.deadline-date.getTime()/1000)/3600).toPrecision(4)}

import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { chakra } from "@chakra-ui/react";
import project_abi from "../../config/crowdfundProjectInstance";
import Web3 from "web3";

const Campaign = ({ token }) => {
  const [donationAmount, setDonationAmount] = useState("0");
  const bg2 = useColorModeValue("white", "gray.800");
  const date = new Date();

  console.log("Campaign is called");
  console.log(token);

  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes;
  }

  const onClick = () => {
    console.log("donationAmount :>> ", donationAmount);
    let provider = window.ethereum;
    
    if(typeof provider != "undefined"){
      web3 = new Web3(provider);
      
      try{
        ethereum.enable();
      } catch (error) {
        // User denied account access...
        alert("Connection Failed")
      }
    } else {
      // Notify user
      alert("Connection Failed")
    }
    const projectInstance = new web3.eth.Contract(project_abi, token.projectAddress);

    function getAccounts(callback) {
      web3.eth.getAccounts((error,result) => {
          if (error) {
              console.log(error);
          } else {
              callback(result);
          }
      });
    }

    getAccounts(function(result) {
      projectInstance.methods
        .contribute()
        .send({
          from: result[0],
          value: web3.utils.toWei(donationAmount, "ether"),
        })
    });
  };

  return (
    <Flex direction={{ base: "row", md: "column" }} bg={bg2} color="gray.400">
      <SimpleGrid
        spacingY={3}
        columns={{ base: 1, md: 4 }}
        w="full"
        py={2}
        px={10}
        fontWeight="hairline"
      >
        <span>{token.projectTitle}</span>
        <chakra.span
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          

          {(token.deadline-date.getTime()/1000).toString().toHHMMSS()}

        </chakra.span>
        <Flex>
          <Button
            as="div"
            size="sm"
            variant="solid"
            //   leftIcon={<Icon as={AiTwotoneLock} />}
            colorScheme="purple"
          >
            {token.currentAmount/(1e18)} / {token.goalAmount/(1e18)}
          </Button>
        </Flex>
        <Flex justify={{ md: "end" }}>
          <NumberInput
            onChange={(valueString) => setDonationAmount(valueString)}
            value={donationAmount}
            precision={18}
            step={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Button
            color="gray.300"
            size="md"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            variant="solid"
            onClick={onClick}
          >
            Donate
          </Button>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default Campaign;
