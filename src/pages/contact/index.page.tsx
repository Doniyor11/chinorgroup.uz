import { Box } from "@mantine/core"

import { ContactContainer, FormBanner, PageHead } from "@/features"

const ContactPage = () => {
  return (
    <main>
      <Box className={"container"}>
        <PageHead
          title={"Контакты"}
          subtitle={
            "Прозрачное ценообразование и индивидуальный подход к каждому проекту"
          }
          description={
            "Мы стремимся сделать ваш опыт в сфере недвижимости плавным, выгодным и без стресса. Наша команда преданных своему делу профессионалов, обладающая многолетним опытом, поможет вам уверенно ориентироваться на рынке недвижимости."
          }
          description2={
            "Будь то покупка, продажа или аренда — мы рядом, чтобы предложить индивидуальный подход и помочь вам достичь ваших целей."
          }
        />
        <ContactContainer />
        <FormBanner
          title={"Нужна точная смета?"}
          subtitle={
            "Свяжитесь с нами для получения детального расчета стоимости вашего проекта"
          }
          button={false}
          buttonText={"Получить консультацию"}
        />
      </Box>
    </main>
  )
}

export default ContactPage
