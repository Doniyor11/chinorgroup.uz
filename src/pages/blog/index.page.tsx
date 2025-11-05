import { Box } from "@mantine/core"
import React from "react"

import { BlogContainer, BreadcrumbCustom, PageHead } from "@/features"

import IconHome from "@/shared/assets/images/icons/home.svg"

const BlogPage = () => {
  return (
    <main>
      <BreadcrumbCustom
        items={[
          { label: "Главная", href: "/", icon: <IconHome /> },
          { label: "Блог" },
        ]}
      />
      <Box className={"container"}>
        <PageHead
          title={"Блог и новости"}
          subtitle={
            "Прозрачное ценообразование и индивидуальный подход к каждому проекту"
          }
          description1={
            "Мы стремимся сделать ваш опыт в сфере недвижимости плавным, выгодным и без стресса. Наша команда преданных своему делу профессионалов, обладающая многолетним опытом, поможет вам уверенно ориентироваться на рынке недвижимости."
          }
          description2={
            "Будь то покупка, продажа или аренда — мы рядом, чтобы предложить индивидуальный подход и помочь вам достичь ваших целей."
          }
          search={true}
        />
        <BlogContainer />
      </Box>
    </main>
  )
}

export default BlogPage
