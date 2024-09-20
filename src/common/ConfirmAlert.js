import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export const ConfirmAlert = ({
  isOpen,
  onClose,
  message,
  heading,
  onConfirm,
  loading,
  type = 'delete',
  buttonTitle = 'Delete',

}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="scale"
      size="lg"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent color={"black"}>
          <AlertDialogCloseButton color={"black"} />
          <AlertDialogHeader fontSize="24" fontWeight="bold">
            <VStack align="center">
              <Box color={type == "success" ? "green" : "red"}>{type == "success" ? <TiTick fontSize={52}/> : <MdOutlineCancel fontSize={52}/> }</Box>
              <Text textAlign="center" w="90%">{heading}</Text>
            </VStack>
          </AlertDialogHeader>

          <AlertDialogBody mb={4}>
            <Text textAlign="center" color="gray.500">{message}</Text>
          </AlertDialogBody>

          <AlertDialogFooter textAlign="center">
            <Button ref={cancelRef} colorScheme="gray" onClick={onClose} size='lg'>
              Cancel
            </Button>
            <Button
              colorScheme={type === 'info' ? 'blue' : type === 'success' ? 'green' : "red"}
              onClick={onConfirm}
              ml={3}
              size='lg'
              isLoading={loading}
            >
              {buttonTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};  
