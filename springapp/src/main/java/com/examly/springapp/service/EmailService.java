package com.examly.springapp.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
 
@Service
public class EmailService {
 
    @Autowired
    private JavaMailSender emailSender;
 
    public void sendSimpleEmail(String to, String subject, String body) {
        try {
            System.out.println("TO : " + to);
            System.out.println("SUBJECT : " + subject);
            System.out.println("BODY : " + body);
 
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("charityconnect9@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            emailSender.send(message);
        } catch (Exception e) {
            System.out.println("Mail Sending Exception : " + e);
        }
    }
}
 