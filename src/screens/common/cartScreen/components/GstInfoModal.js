import React from 'react';
import {Modal, Pressable, View} from 'react-native';
import {StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const GstInfoModal = ({
  visible,
  gstOnItemTotal,
  gstOnProfessionalFee,
  gstOnSlotCharge = 0,
  totalGst,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.gstModalBackdrop} onPress={onClose}>
        <Pressable style={styles.gstModalCard} onPress={() => {}}>
          <StyledText
            color={COLORS.BLACK}
            size={15}
            textStyle={styles.gstModalDisclaimer}>
            Pronto has no role to play in taxes levied by the govt.
          </StyledText>

          <View style={styles.gstModalDivider} />

          <View style={styles.gstModalRow}>
            <StyledText color={COLORS.BLACK} size={14}>
              GST on Item total
            </StyledText>
            <StyledText color={COLORS.BLACK} size={14}>
              ₹{gstOnItemTotal.toFixed(2)}
            </StyledText>
          </View>

          <View style={styles.gstModalRow}>
            <StyledText color={COLORS.BLACK} size={14}>
              GST on Professional Service Fee
            </StyledText>
            <StyledText color={COLORS.BLACK} size={14}>
              ₹{gstOnProfessionalFee.toFixed(2)}
            </StyledText>
          </View>

          {gstOnSlotCharge > 0 ? (
            <View style={styles.gstModalRow}>
              <StyledText color={COLORS.BLACK} size={14}>
                GST on Slot charge
              </StyledText>
              <StyledText color={COLORS.BLACK} size={14}>
                ₹{gstOnSlotCharge.toFixed(2)}
              </StyledText>
            </View>
          ) : null}

          <View style={styles.gstModalDivider} />

          <View style={styles.gstModalRow}>
            <StyledText
              color={COLORS.BLACK}
              size={15}
              textStyle={styles.gstModalTotal}>
              Total
            </StyledText>
            <StyledText
              color={COLORS.BLACK}
              size={15}
              textStyle={styles.gstModalTotal}>
              ₹{totalGst.toFixed(2)}
            </StyledText>
          </View>

          <Pressable style={styles.gstOkayButton} onPress={onClose}>
            <StyledText
              color="#2563EB"
              size={15}
              textStyle={styles.gstOkayText}>
              OKAY
            </StyledText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default React.memo(GstInfoModal);
