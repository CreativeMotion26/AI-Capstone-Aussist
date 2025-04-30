import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const jobSites = [
  {
    id: '1',
    name: 'Seek',
    desc: 'Australia\'s largest job site',
    url: 'https://www.seek.com.au',
    image: require('../assets/images/seek.jpg'),
  },
  {
    id: '2',
    name: 'Indeed',
    desc: 'Search millions of jobs',
    url: 'https://au.indeed.com',
    image: require('../assets/images/indeed.jpg'),
  },
  {
    id: '3',
    name: 'LinkedIn',
    desc: 'Professional networking and job search',
    url: 'https://www.linkedin.com',
    image: require('../assets/images/link.jpg'),
  },
  {
    id: '4',
    name: 'JobActive',
    desc: 'Australian Government job search website',
    url: 'https://jobsearch.gov.au',
    image: require('../assets/images/jobact.jpg'),
  },
];

const workerRights = [
  {
    id: '1',
    name: 'Fair Work Ombudsman',
    desc: 'Information about pay, leave, and workplace rights',
    url: 'https://www.fairwork.gov.au',
    icon: 'gavel',
  },
  {
    id: '2',
    name: 'WorkSafe NSW',
    desc: 'Workplace health and safety information',
    url: 'https://www.safework.nsw.gov.au',
    icon: 'health-and-safety',
  },
  {
    id: '3',
    name: 'Know your Minimum Wage',
    desc: 'Learn about minimum wages, penalty rates, and your pay rights in Australia',
    url: '#', // URL will be updated later
    icon: 'payments',
  },
];

const training = [
  {
    id: '1',
    name: 'TAFE NSW Courses',
    desc: 'Vocational education and training programs',
    url: 'https://www.tafensw.edu.au',
    icon: 'school',
  },
  {
    id: '2',
    name: 'Skills for Education and Employment',
    desc: 'Free training program for eligible job seekers',
    url: 'https://www.employment.gov.au/skills-education-and-employment',
    icon: 'trending-up',
  },
];

const supportServices = [
  {
    id: '1',
    name: 'Migrant Employment Support',
    desc: 'Settlement Services International (SSI)',
    url: 'https://www.ssi.org.au/services/employment',
    icon: 'support-agent',
  },
  {
    id: '2',
    name: 'Career Counseling',
    desc: 'Free career advice and support',
    url: 'https://www.careers.nsw.gov.au',
    icon: 'psychology',
  },
];

const volunteeringOrgs = [
  {
    id: '1',
    name: 'GoVolunteer',
    desc: 'Find volunteering opportunities across Australia',
    url: 'https://govolunteer.com.au',
    icon: 'volunteer-activism',
  },
  {
    id: '2',
    name: 'Seek Volunteer',
    desc: 'Search for volunteer work in your area',
    url: 'https://www.volunteer.com.au',
    icon: 'favorite',
  },
];

export default function JobsScreen() {
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      if (prev.includes(section)) {
        return prev.filter(s => s !== section);
      } else {
        return [...prev, section];
      }
    });
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Job Opportunity',
          headerBackTitle: 'Back'
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Finding a Job Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Finding a Job</Text>
            <Text style={styles.sectionDesc}>Popular job search websites in Australia</Text>
            {jobSites.map(site => (
              <TouchableOpacity
                key={site.id}
                style={styles.card}
                onPress={() => Linking.openURL(site.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.imageContainer}>
                    <Image source={site.image} style={styles.siteImage} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{site.name}</Text>
                    <Text style={styles.siteDesc}>{site.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Resume Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resume Writing</Text>
            <Text style={styles.sectionDesc}>Develop your resume for more opportunities</Text>
            
            {/* Resume & CV Tips Card */}
            <TouchableOpacity
              style={[styles.card, styles.expandableCard]}
              onPress={() => toggleSection('resume')}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="description" size={30} color="#222" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.siteName}>Resume & CV Tips</Text>
                  <Text style={styles.siteDesc}>Essential elements for your professional resume</Text>
                </View>
                <MaterialIcons 
                  name={expandedSections.includes('resume') ? "expand-less" : "expand-more"} 
                  size={24} 
                  color="#1976D2" 
                />
              </View>
              
              {expandedSections.includes('resume') && (
                <View style={styles.expandedContent}>
                  <View style={styles.checklist}>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Your name and contact details</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Professional summary or career objective</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Education</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Relevant experience</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Skills</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Qualifications and certificates</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Extracurricular activities</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Insights about the organisation</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>References (or referees)</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.learnMoreButton}
                    onPress={() => Linking.openURL('')}
                  >
                    <Text style={styles.learnMoreText}>Learn more about Resume & CV Tips</Text>
                    <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {/* Cover Letter Tips Card */}
            <TouchableOpacity
              style={[styles.card, styles.expandableCard]}
              onPress={() => toggleSection('coverLetter')}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="mail" size={30} color="#222" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.siteName}>Cover Letter Tips</Text>
                  <Text style={styles.siteDesc}>Key components of an effective cover letter</Text>
                </View>
                <MaterialIcons 
                  name={expandedSections.includes('coverLetter') ? "expand-less" : "expand-more"} 
                  size={24} 
                  color="#1976D2" 
                />
              </View>
              
              {expandedSections.includes('coverLetter') && (
                <View style={styles.expandedContent}>
                  <View style={styles.checklist}>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>A professional introduction</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>A personal summary</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>How your experience matches the job</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>A polite conclusion</Text>
                    </View>
                    <View style={styles.checklistItem}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                      <Text style={styles.checklistText}>Your name and contact details</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.learnMoreButton}
                    onPress={() => Linking.openURL('')}
                  >
                    <Text style={styles.learnMoreText}>Learn more about Cover Letter Tips</Text>
                    <MaterialIcons name="open-in-new" size={20} color="#1976D2" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Workers Rights Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workers' Rights</Text>
            <Text style={styles.sectionDesc}>Know your workplace rights and safety</Text>
            {workerRights.map(right => (
              <TouchableOpacity
                key={right.id}
                style={styles.card}
                onPress={() => Linking.openURL(right.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={right.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{right.name}</Text>
                    <Text style={styles.siteDesc}>{right.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Training Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Training & Upskilling</Text>
            <Text style={styles.sectionDesc}>Improve your skills and qualifications</Text>
            {training.map(course => (
              <TouchableOpacity
                key={course.id}
                style={styles.card}
                onPress={() => Linking.openURL(course.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={course.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{course.name}</Text>
                    <Text style={styles.siteDesc}>{course.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Support Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Services</Text>
            <Text style={styles.sectionDesc}>Get help with your job search</Text>
            {supportServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.card}
                onPress={() => Linking.openURL(service.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={service.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{service.name}</Text>
                    <Text style={styles.siteDesc}>{service.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Volunteering Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteering</Text>
            <Text style={styles.sectionDesc}>Gain experience through volunteer work</Text>
            {volunteeringOrgs.map(org => (
              <TouchableOpacity
                key={org.id}
                style={styles.card}
                onPress={() => Linking.openURL(org.url)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name={org.icon as any} size={30} color="#222" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.siteName}>{org.name}</Text>
                    <Text style={styles.siteDesc}>{org.desc}</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="#1976D2" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  siteName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  siteDesc: {
    fontSize: 14,
    color: '#666',
  },
  expandableCard: {
    overflow: 'hidden',
  },
  expandedContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checklist: {
    marginBottom: 4,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    marginRight: 12,
  },
  checklistText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#666',
  },
  learnMoreText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
}); 