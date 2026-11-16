import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, Input, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const EditReceiverModal = ({
  visible,
  initialName,
  initialPhone,
  loading = false,
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(initialName || '');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!visible) {
      return;
    }
    setName(initialName || '');
    const digits = String(initialPhone || '').replace(/\D/g, '');
    setPhone(digits.slice(-10));
  }, [initialName, initialPhone, visible]);

  const canSave =
    !loading && name.trim().length > 0 && phone.trim().length >= 10;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View
          style={[
            styles.receiverSheet,
            {paddingBottom: Math.max(insets.bottom, 16)},
          ]}>
          <View style={styles.receiverHeader}>
            <StyledText
              color={COLORS.BLACK}
              size={18}
              textStyle={styles.receiverTitle}>
              Edit receiver's details
            </StyledText>
            <Pressable
              style={styles.receiverClose}
              onPress={onClose}
              hitSlop={8}>
              <Icon name="close" size={18} color={COLORS.GRAY} />
            </Pressable>
          </View>

          <Input
            label="Full name"
            value={name}
            onChangeText={setName}
            containerStyle={styles.receiverInput}
            autoCapitalize="words"
          />

          <View style={styles.phoneField}>
            <StyledText
              color={COLORS.PRIMARY}
              size={12}
              textStyle={styles.phoneFloatingLabel}>
              Contact number
            </StyledText>
            <View style={styles.phoneRow}>
              <StyledText
                color={COLORS.BLACK}
                size={16}
                textStyle={styles.phoneCode}>
                +91
              </StyledText>
              <View style={styles.phoneDivider} />
              <TextInput
                value={phone}
                onChangeText={text => setPhone(text.replace(/\D/g, '').slice(0, 10))}
                keyboardType="phone-pad"
                style={styles.phoneInput}
                placeholderTextColor={COLORS.GRAY_LIGHT}
              />
            </View>
          </View>

          <Pressable
            style={[
              styles.confirmButton,
              !canSave && styles.confirmButtonDisabled,
            ]}
            disabled={!canSave}
            onPress={() =>
              onSave?.({
                name: name.trim(),
                phone: phone.trim(),
              })
            }>
            <StyledText
              color={COLORS.WHITE}
              size={16}
              textStyle={styles.confirmButtonText}>
              {loading ? 'Saving...' : 'Save changes'}
            </StyledText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(EditReceiverModal);
