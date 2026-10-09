import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  Button,
  Header,
  Icon,
  Input,
  ScreenContainer,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {errorToast} from '../../../utils/alerts';
import styles from './styles';

const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  quality: 0.8,
  maxWidth: 1024,
  maxHeight: 1024,
  selectionLimit: 1,
  cameraType: 'front',
};

const UserDetailScreen = () => {
  const {t} = useTranslation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('8219840664');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdateProfile = useCallback(() => {
    // Update profile will be wired later
  }, []);

  const applyPickedImage = useCallback(
    result => {
      if (result?.didCancel) {
        return;
      }
      if (result?.errorCode) {
        errorToast(
          result.errorMessage || t('PROFILE_DETAILS_SCREEN.PHOTO_ERROR'),
        );
        return;
      }
      const uri = result?.assets?.[0]?.uri;
      if (uri) {
        setProfileImage(uri);
      }
    },
    [t],
  );

  const requestCameraPermission = useCallback(async () => {
    if (Platform.OS !== 'android') {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  const openCamera = useCallback(async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      errorToast(t('PROFILE_DETAILS_SCREEN.PHOTO_ERROR'));
      return;
    }
    const result = await launchCamera(IMAGE_PICKER_OPTIONS);
    applyPickedImage(result);
  }, [applyPickedImage, requestCameraPermission, t]);

  const openGallery = useCallback(async () => {
    const result = await launchImageLibrary(IMAGE_PICKER_OPTIONS);
    applyPickedImage(result);
  }, [applyPickedImage]);

  const handleEditPhoto = useCallback(() => {
    Alert.alert(
      t('PROFILE_DETAILS_SCREEN.PHOTO_TITLE'),
      undefined,
      [
        {
          text: t('PROFILE_DETAILS_SCREEN.CAMERA'),
          onPress: openCamera,
        },
        {
          text: t('PROFILE_DETAILS_SCREEN.GALLERY'),
          onPress: openGallery,
        },
        {
          text: t('PROFILE_DETAILS_SCREEN.CANCEL'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }, [openCamera, openGallery, t]);

  return (
    <ScreenContainer>
      <View style={styles.root}>
        <Header
          title={t('PROFILE_DETAILS_SCREEN.TITLE')}
          titleAlign="center"
          titleSize={18}
          backgroundColor="#F4F6FB"
        />

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image
                    source={{uri: profileImage}}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Icon name="person-outline" size={52} color={COLORS.BLACK} />
                )}
              </View>
              <Pressable
                style={styles.editBadge}
                onPress={handleEditPhoto}
                hitSlop={8}>
                <Icon name="edit" size={16} color={COLORS.PRIMARY_DARK} />
              </Pressable>
            </View>

            <Input
              label={t('PROFILE_DETAILS_SCREEN.FIRST_NAME')}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
            />

            <Input
              label={t('PROFILE_DETAILS_SCREEN.LAST_NAME')}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
            />

            <Input
              label={t('PROFILE_DETAILS_SCREEN.MOBILE')}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
            />

            <Input
              label={t('PROFILE_DETAILS_SCREEN.EMAIL')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <Button
            title={t('PROFILE_DETAILS_SCREEN.UPDATE')}
            onPress={handleUpdateProfile}
            style={styles.updateButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default UserDetailScreen;
