import React from "react";
import {
    Modal as RNModal,
    ModalProps as RNModalProps,
    Text,
    useColorScheme,
} from "react-native";
import { View } from "tamagui";

interface ModalProps extends Omit<RNModalProps, "visible"> {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeButton?: boolean;
}

export const ModalWrapper = React.forwardRef<any, ModalProps>(
  (
    { visible, onClose, children, title, closeButton = true, ...props },
    ref,
  ) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <RNModal
        ref={ref}
        visible={visible}
        onRequestClose={onClose}
        transparent
        animationType="fade"
        {...props}
      >
        {/* Backdrop */}
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          {/* Modal Container */}
          <View
            style={{
              backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 16,
              paddingBottom: 24,
              paddingHorizontal: 16,
              maxHeight: "90%",
            }}
          >
            {/* Close indicator */}
            {closeButton && (
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: isDark ? "#424245" : "#E0E0E0",
                  borderRadius: 2,
                  alignSelf: "center",
                  marginBottom: 12,
                }}
              />
            )}

            {/* Title */}
            {title && (
              <View
                style={{
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: isDark ? "#FFFFFF" : "#000000",
                  }}
                >
                  {title}
                </Text>
              </View>
            )}

            {/* Content */}
            {children}
          </View>
        </View>
      </RNModal>
    );
  },
);

ModalWrapper.displayName = "ModalWrapper";
