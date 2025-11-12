import { Box } from "@mantine/core"

import { FormBanner } from "@/features"

const ContactPage = () => {
  return (
    <main>
      <Box className={"container"}>
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
