import { BANNER } from "@/assets";
import AppWrapper from "@/components/hoc/AppWrapper";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";
export default function PrivacyPolicy() {
  const PrivacyText = styled.ol`
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;

    li {
      display: table;
      counter-increment: item;
      margin-bottom: 0.6em;

      & > ol > li {
        margin-bottom: 0.3em;
      }
    }

    li:before {
      content: counters(item, ".") ". ";
      display: table-cell;
      padding-right: 0.6em;
    }

    li li {
      margin: 0;
    }

    li li:before {
      content: counters(item, ".") " ";
    }
  `;

  const BulletParagraph = styled.p`
  position: relative;
  padding-left: 1.5em;
  margin: 0;
   margin-bottom: 0.3em;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: black;]
  }
`;
  return (
    <AppWrapper>
      <Box
        sx={{
          background:
            "linear-gradient(93.82deg, #FE8308 -3.25%, #EC4528 99.01%)",
          padding: "2rem 1rem",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Privacy Policy
        </Typography>
      </Box>

      <Container
        sx={{
          py: 5,
        }}
      >
        <Box>
          <PrivacyText>
            <li>
              บทนำ
              <PrivacyText>
                <div>
                  ระบบแหล่งรวมงานสำหรับ Influencer
                  มีจุดประสงค์ในการบันทึกและจัดเก็บข้อมูลผู้ป่วยที่เข้ารับการบำบัดและฟื้นฟูผู้ติดยาเสพติด
                  การใช้งานระบบนี้ต้องปฏิบัติตามข้อกำหนดและเงื่อนไขที่กำหนดไว้ในนโยบายนี้
                  เพื่อปกป้องความเป็นส่วนตัวและความปลอดภัยของข้อมูลผู้ป่วย
                </div>
              </PrivacyText>
            </li>

            <li>
              นโยบายความเป็นส่วนตัว
              <PrivacyText>
                <li>การเก็บรวบรวมข้อมูล</li>
                <BulletParagraph>
                  ระบบจะเก็บรวบรวมข้อมูลส่วนบุคคลของผู้ป่วย เช่น ชื่อ นามสกุล
                  อายุ ที่อยู่ หมายเลขบัตรประชาชน ประวัติการรักษา
                  ยาและปริมาณที่ใช้ การตอบสนองต่อการรักษา และข้อมูลอื่น ๆ
                  ที่เกี่ยวข้องกับการบำบัดรักษา
                </BulletParagraph>
                <BulletParagraph>
                  ข้อมูลการเข้าใช้งานของผู้ใช้ เช่น IP Address,
                  ประเภทของเบราว์เซอร์, เวลาที่เข้าใช้งาน,
                  และข้อมูลการเข้าชมหน้าเว็บไซต์
                </BulletParagraph>
                <li>การใช้ข้อมูล</li>
                <BulletParagraph>
                  ข้อมูลที่เก็บรวบรวมจะถูกใช้เพื่อวัตถุประสงค์ในการบำบัดและฟื้นฟูผู้ติดยาเสพติด
                  การวิเคราะห์เพื่อปรับปรุงการรักษา
                  การทำวิจัยเพื่อพัฒนาวิธีการบำบัดรักษา และ
                  การติดตามผลการบำบัดรักษาตามนโยบายของรัฐบาล
                </BulletParagraph>
                <BulletParagraph>
                  ข้อมูลการเข้าใช้งานจะถูกใช้เพื่อวัตถุประสงค์ในการปรับปรุงการให้บริการและความปลอดภัยของระบบ
                </BulletParagraph>
                <li>การคุ้มครองข้อมูล</li>
                <BulletParagraph>
                  ระบบมีมาตรการป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต เช่น
                  การใช้เทคโนโลยีการเข้ารหัสข้อมูล การใช้ระบบตรวจสอบการเข้าถึง
                  และการรักษาความปลอดภัยทางกายภาพ
                </BulletParagraph>
                <BulletParagraph>
                  การเข้าถึงข้อมูลจะจำกัดเฉพาะเจ้าหน้าที่และบุคลากรที่ได้รับอนุญาตและมีความจำเป็นในการใช้งานเท่านั้น
                </BulletParagraph>
              </PrivacyText>
            </li>

            <li>
              เงื่อนไขการใช้บริการ
              <PrivacyText>
                <li>การลงทะเบียน</li>
                <BulletParagraph>
                  ผู้ใช้งานต้องลงทะเบียนและได้รับอนุญาตจากผู้ดูแลระบบก่อนที่จะสามารถเข้าถึงระบบได้
                </BulletParagraph>
                <BulletParagraph>
                  การลงทะเบียนต้องให้ข้อมูลที่ถูกต้องและครบถ้วนตามที่ระบบกำหนด
                </BulletParagraph>
                <li>ความรับผิดชอบของผู้ใช้งาน</li>
                <BulletParagraph>
                  ผู้ใช้งานต้องรักษาความลับของข้อมูลการเข้าสู่ระบบ เช่น
                  ชื่อผู้ใช้และรหัสผ่าน
                  และไม่เผยแพร่ข้อมูลดังกล่าวให้กับบุคคลที่ไม่ได้รับอนุญาต
                </BulletParagraph>
                <BulletParagraph>
                  ผู้ใช้งานต้องไม่กระทำการใด ๆ
                  ที่อาจก่อให้เกิดความเสียหายต่อระบบ เช่น การพยายามเจาะระบบ
                  การเผยแพร่ไวรัส หรือการกระทำอื่น ๆ ที่เป็นอันตราย
                </BulletParagraph>
                <li>การจัดการข้อมูล</li>
                <BulletParagraph>
                  ผู้ใช้งานต้องปฏิบัติตามนโยบายนี้และข้อกำหนดทางกฎหมายที่เกี่ยวข้องในการจัดการข้อมูลผู้ป่วย
                </BulletParagraph>
                <BulletParagraph>
                  การแก้ไขหรือปรับปรุงข้อมูลต้องดำเนินการโดยเจ้าหน้าที่ที่ได้รับอนุญาตเท่านั้น
                </BulletParagraph>
              </PrivacyText>
            </li>
          </PrivacyText>
        </Box>
      </Container>
    </AppWrapper>
  );
}
