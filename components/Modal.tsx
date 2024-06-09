import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@/public/assets/icons/XMarkIcon";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Modal) {
  const backdrop = {
    visible: { opacity: 1, backdropFilter: "blur(5px)" },
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  };

  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            // className="bg-white rounded-lg p-8"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card shadow="lg" radius="lg" className="max-w-96 border-[0px]">
              <CardHeader className="group flex justify-end">
                <Button size="sm" className="bg-red/20" onClick={onClose}>
                  <XMarkIcon
                    size={16}
                    color="rgb(240 40 73)"
                    className=" group-hover:rotate-12 duration-300"
                  />
                </Button>
              </CardHeader>
              <CardBody>{children}</CardBody>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
