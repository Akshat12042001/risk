import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {makeGetServiceRequest} from '../../../api/services';
import DurationCard from './components/DurationCard';
import FaqItem from './components/FaqItem';
import TrustFooter from './components/TrustFooter';
import styles from './styles';

const STEP_ICONS = ['home', 'cleaning-services', 'verified'];

const EMPTY_SERVICE = {
  name: '',
  badge: '',
  headline: '',
  bookCta: 'BOOK NOW',
  rating: 0,
  ratingCountLabel: '',
  heroImage: null,
  durations: [],
  processSteps: [],
  included: [],
  excluded: [],
  faqs: [],
  trust: null,
  proImage: null,
};

const StarRow = ({rating}) => {
  const stars = useMemo(() => {
    return Array.from({length: 5}).map((_, index) => {
      const value = index + 1;
      if (rating >= value) {
        return 'star';
      }
      if (rating >= value - 0.5) {
        return 'star-half';
      }
      return 'star-border';
    });
  }, [rating]);

  return (
    <View style={styles.starsRow}>
      {stars.map((name, index) => (
        <Icon key={`${name}-${index}`} name={name} size={16} color="#FBBF24" />
      ))}
    </View>
  );
};

const mapServiceResponse = payload => {
  const apiData = payload?.data?.service ?? payload?.data ?? payload ?? {};

  const processSteps = Array.isArray(apiData.steps)
    ? apiData.steps.map((step, index) => ({
        id: step.id || `step-${index}`,
        title: step.title,
        description: step.description,
        icon: step.icon || STEP_ICONS[index % STEP_ICONS.length],
      }))
    : [];

  const faqs = Array.isArray(apiData.faqs)
    ? apiData.faqs.map((faq, index) => ({
        id: faq.id || `faq-${index}`,
        question: faq.question,
        answer: faq.answer,
      }))
    : [];

  const assurance = apiData.assurance;
  const trust = assurance
    ? {
        title: assurance.title || '',
        left: {
          label: 'Trusted by',
          value: assurance.trustedBy || '',
          suffix: assurance.trustedByLabel || '',
        },
        right: {
          label: 'Rated',
          value:
            assurance.rating != null ? String(assurance.rating) : '',
          suffix: assurance.ratingCount || '',
        },
      }
    : null;

  return {
    ...EMPTY_SERVICE,
    name: apiData.name || '',
    badge: apiData.label || apiData.badge || '',
    headline: apiData.headline || '',
    rating: apiData.rating ?? 0,
    ratingCountLabel: apiData.ratingCount
      ? `${apiData.ratingCount} ratings`
      : '',
    durations: Array.isArray(apiData.durations) ? apiData.durations : [],
    heroImage: apiData.imageUrl || apiData.heroImage || null,
    processSteps,
    included: Array.isArray(apiData.included) ? apiData.included : [],
    excluded: Array.isArray(apiData.excluded) ? apiData.excluded : [],
    faqs,
    trust,
    proImage: apiData.proImage || null,
  };
};

const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const serviceId = route.params?.serviceId;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadService = async () => {
      if (!serviceId) {
        if (isActive) {
          setData(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        const response = await makeGetServiceRequest(serviceId);
        if (isActive) {
          const mapped = mapServiceResponse(response);
          setData(mapped);
          setExpandedFaqId(mapped.faqs[0]?.id || null);
        }
      } catch (error) {
        if (isActive) {
          setData(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadService();

    return () => {
      isActive = false;
    };
  }, [serviceId]);

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const handleShare = useCallback(async () => {
    if (!data?.name) {
      return;
    }
    try {
      await Share.share({
        message: data.headline
          ? `${data.name} — ${data.headline}`
          : data.name,
      });
    } catch (error) {
      // no-op
    }
  }, [data]);

  const handleBookNow = useCallback(() => {
    // Booking flow will be wired later
  }, []);

  const handleAddDuration = useCallback(() => {
    // Cart/add flow will be wired later
  }, []);

  const handleToggleFaq = useCallback(id => {
    setExpandedFaqId(prev => (prev === id ? null : id));
  }, []);

  const renderFloatingBack = () => (
    <View style={[styles.heroTopBar, {top: insets.top + 6}]}>
      <Pressable style={styles.roundButton} onPress={handleBack} hitSlop={8}>
        <Icon name="arrow-back" size={22} color={COLORS.BLACK} />
      </Pressable>
      <View style={styles.roundButtonPlaceholder} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.loaderWrap, {paddingTop: insets.top + 80}]}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
        {renderFloatingBack()}
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.loaderWrap, {paddingTop: insets.top + 80}]}>
          <StyledText color={COLORS.GRAY} size={14}>
            Unable to load service details
          </StyledText>
        </View>
        {renderFloatingBack()}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View style={styles.heroWrap}>
          {data.heroImage ? (
            <Image
              source={{uri: data.heroImage}}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : null}
          <View style={styles.heroOverlay} />

          <View style={[styles.heroTopBar, {top: insets.top + 6}]}>
            <Pressable
              style={styles.roundButton}
              onPress={handleBack}
              hitSlop={8}>
              <Icon name="arrow-back" size={22} color={COLORS.BLACK} />
            </Pressable>
            <Pressable
              style={styles.roundButton}
              onPress={handleShare}
              hitSlop={8}>
              <Icon name="share" size={20} color={COLORS.BLACK} />
            </Pressable>
          </View>

          <View style={styles.heroContent}>
            {data.badge ? (
              <View style={styles.badge}>
                <Icon name="schedule" size={14} color={COLORS.WHITE} />
                <StyledText
                  color={COLORS.WHITE}
                  size={11}
                  textStyle={styles.badgeText}>
                  {data.badge}
                </StyledText>
              </View>
            ) : null}
            {data.headline ? (
              <StyledText
                color={COLORS.WHITE}
                size={28}
                textStyle={styles.headline}>
                {data.headline}
              </StyledText>
            ) : null}
            <Pressable style={styles.bookButton} onPress={handleBookNow}>
              <StyledText
                color={COLORS.PRIMARY}
                size={13}
                textStyle={styles.bookButtonText}>
                {data.bookCta}
              </StyledText>
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          {data.name ? (
            <StyledText color={COLORS.BLACK} size={26} textStyle={styles.title}>
              {data.name}
            </StyledText>
          ) : null}

          {data.rating ? (
            <View style={styles.ratingRow}>
              <StarRow rating={data.rating} />
              <StyledText
                color={COLORS.BLACK}
                size={14}
                textStyle={styles.ratingValue}>
                {data.rating}
              </StyledText>
              {data.ratingCountLabel ? (
                <StyledText color={COLORS.GRAY} size={13}>
                  ({data.ratingCountLabel})
                </StyledText>
              ) : null}
            </View>
          ) : null}

          {data.durations.length ? (
            <>
              <StyledText
                color={COLORS.GRAY}
                size={14}
                textStyle={styles.sectionLabel}>
                Select service duration
              </StyledText>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.durationList}>
                {data.durations.map(item => (
                  <DurationCard
                    key={item.id}
                    item={item}
                    onAdd={handleAddDuration}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}

          {data.processSteps.length ? (
            <>
              <StyledText
                color={COLORS.BLACK}
                size={18}
                textStyle={styles.sectionTitle}>
                How is the service done?
              </StyledText>

              {data.processSteps.map(step => (
                <View key={step.id} style={styles.processStep}>
                  <View style={styles.processIconWrap}>
                    <Icon name={step.icon} size={26} color={COLORS.PRIMARY} />
                  </View>
                  <View style={styles.processText}>
                    <StyledText
                      color={COLORS.BLACK}
                      size={15}
                      textStyle={styles.processTitle}>
                      {step.title}
                    </StyledText>
                    <StyledText color={COLORS.GRAY} size={13}>
                      {step.description}
                    </StyledText>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          {data.included.length ? (
            <>
              <StyledText
                color={COLORS.BLACK}
                size={18}
                textStyle={styles.sectionTitle}>
                Included in service
              </StyledText>

              {data.included.map(item => (
                <View key={item} style={styles.listItem}>
                  <Icon
                    name="check"
                    size={18}
                    color={COLORS.PRIMARY}
                    style={styles.listIcon}
                  />
                  <StyledText
                    color={COLORS.BLACK}
                    size={14}
                    textStyle={styles.listText}>
                    {item}
                  </StyledText>
                </View>
              ))}
            </>
          ) : null}

          {data.excluded.length ? (
            <>
              <StyledText
                color={COLORS.BLACK}
                size={18}
                textStyle={styles.sectionTitle}>
                Excluded
              </StyledText>

              {data.excluded.map(item => (
                <View key={item} style={styles.listItem}>
                  <Icon
                    name="close"
                    size={18}
                    color="#F87171"
                    style={styles.listIcon}
                  />
                  <StyledText
                    color={COLORS.BLACK}
                    size={14}
                    textStyle={styles.listText}>
                    {item}
                  </StyledText>
                </View>
              ))}
            </>
          ) : null}

          {data.faqs.length ? (
            <>
              <StyledText
                color={COLORS.BLACK}
                size={18}
                textStyle={styles.sectionTitle}>
                Frequently asked questions
              </StyledText>

              {data.faqs.map(item => (
                <FaqItem
                  key={item.id}
                  item={item}
                  expanded={expandedFaqId === item.id}
                  onToggle={handleToggleFaq}
                />
              ))}
            </>
          ) : null}

          {data.trust ? (
            <TrustFooter trust={data.trust} proImage={data.proImage} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceDetailScreen;
